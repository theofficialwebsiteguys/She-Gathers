import { CommonModule } from '@angular/common';
import { Component, computed, effect, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vendor, VendorService } from '../../vendor.service';
import { Activity, EventPlan, EventWizardSettings, Option } from '../../models';

@Component({
  selector: 'app-event-wizard',
  imports: [CommonModule, FormsModule],
  templateUrl: './event-wizard.component.html',
  styleUrl: './event-wizard.component.scss'
})
export class EventWizardComponent {
  @Input() settings: EventWizardSettings = {};

  // UI state
  step = signal(0);

  // selections
  vendorId = signal<string | null>(null);
  selActivities = signal<Set<string>>(new Set());
  attendees = signal<number>(0);
  eventType = signal<string>('Birthday');
  selFood = signal<Set<string>>(new Set());
  selDessert = signal<Set<string>>(new Set());
  selFavors = signal<Set<string>>(new Set());

  depositPercent = computed(() => this.settings.depositPercent ?? 0.2);

  // data
  vendors = computed<Vendor[]>(() => {
    const all = this.catalog.vendors();
    console.log(all)
    const allow = this.settings.allowedVendorIds;
    return allow?.length ? all.filter(v => allow.includes(v.id)) : all;
  });

  currentVendor = computed<Vendor | null>(() =>
    this.vendorId() ? this.catalog.getVendorById(this.vendorId()!) : null
  );
  activities = computed<Activity[]>(() => this.currentVendor()?.activities ?? []);
  pricePerHead = computed<number>(() => {
    const v = this.currentVendor();
    const acts = this.selActivities();
    let total = 0;
    acts.forEach(id => {
      const a = this.activities().find(x => x.id === id);
      total += (a?.pricePerHead ?? v?.defaultPricePerHead ?? 0);
    });
    return total;
  });

lineItems = computed(() => {
  const n = this.attendees();
  const ids = this.selectedVendorIds();
  const items: { vendorId: string; vendor: string; label: string; amount: number }[] = [];

  this.catalog.vendors().forEach(v => {
    if (!ids.has(v.id)) return;

    // Bundle all selected activities into one line
    const selectedActs = [...this.selActivities()]
      .map(id => v.activities.find(a => a.id === id))
      .filter(Boolean);

    if (selectedActs.length) {
      const totalPerPerson = v.defaultPricePerHead ?? 0;
      const label = selectedActs.map(a => a!.title).join(' + ');
      items.push({
        vendorId: v.id,
        vendor: v.name,
        label: `${label} (${n} × ${currency(totalPerPerson)})`,
        amount: n * totalPerPerson,
      });
    }

    // Food / Dessert / Favors
    const addOpts = (ids: Set<string>, pool?: Option[], prefix?: string) => {
      (pool ?? []).forEach((opt: any) => {
        if (!ids.has(opt.id)) return;
        if (opt.pricingType === 'perHead') {
          items.push({
            vendorId: v.id,
            vendor: v.name,
            label: `${prefix} ${opt.label} (${n} × ${currency(opt.price)})`,
            amount: n * opt.price,
          });
        } else {
          items.push({
            vendorId: v.id,
            vendor: v.name,
            label: `${prefix} ${opt.label}`,
            amount: opt.price,
          });
        }
      });
    };

    addOpts(this.selFood(), v.foodOptions, 'Food:');
    addOpts(this.selDessert(), v.dessertOptions, 'Dessert:');
    addOpts(this.selFavors(), v.favorOptions, 'Favors:');
  });

  return items;
});



  allFoodOptions = computed<Option[]>(() => {
    const opts: Option[] = [];
    this.catalog.vendors().forEach(v => opts.push(...(v.foodOptions ?? [])));
    return opts;
  });

  // Same for dessert and favors
  allDessertOptions = computed<Option[]>(() => {
    const opts: Option[] = [];
    this.catalog.vendors().forEach(v => opts.push(...(v.dessertOptions ?? [])));
    return opts;
  });

  allFavorOptions = computed<Option[]>(() => {
    const opts: Option[] = [];
    this.catalog.vendors().forEach(v => opts.push(...(v.favorOptions ?? [])));
    return opts;
  });

  subtotal = computed(() => this.lineItems().reduce((s, li) => s + li.amount, 0));

  depositAmount = computed(() => round2(this.subtotal() * this.depositPercent()));
  total = computed(() => round2(this.subtotal()));

  constructor(public catalog: VendorService) {
    effect(() => {
      const pre = this.settings.preselectVendorId;
      if (pre && !this.vendorId()) {
        this.vendorId.set(pre);
      }
    });
    effect(() => {
      const vendors = this.vendors();
    });
    
  }


  fallbackVendors = computed(() => {
    return this.catalog.vendors();
  });


  getLineItemsForVendor(vendorId: string) {
    return this.lineItems().filter(li => li.vendorId === vendorId);
  }


  getVendorLineItems(vendorName: string) {
    return this.lineItems().filter(l => l.vendor === vendorName);
  }

  isOpen = signal(false);

openWizard() {
  this.step.set(1); // skip intro, start at next step
  this.isOpen.set(true);
  document.body.style.overflow = 'hidden';
}


closeWizard() {
  this.isOpen.set(false);
  document.body.style.overflow = '';
}


  toggle(setSig: typeof this.selFood, id: string) {
    const next = new Set(setSig());
    next.has(id) ? next.delete(id) : next.add(id);
    setSig.set(next);
  }

  next() { this.step.set(Math.min(this.step() + 1, this.steps().length - 1)); }
  back() { this.step.set(Math.max(this.step() - 1, 0)); }

  steps = computed(() => {
    const arr = [
      { key: 'intro', show: true, label: 'Intro' },
      { key: 'guests', show: true, label: 'Guests' },
      { key: 'type', show: true, label: 'Event Type' },
      { key: 'activity', show: true, label: 'Activity' },
      { key: 'food', show: true, label: 'Food' },
      { key: 'dessert', show: true, label: 'Dessert' },
      { key: 'favors', show: true, label: 'Favors' },
      { key: 'vendors', show: true, label: 'Vendors' },   // <-- new step
      { key: 'review', show: true, label: 'Review' },
    ];
    return arr.filter(s => s.show);
  });

  matchedVendors = computed(() => {
    const n = this.attendees();
    const acts = this.selActivities();
    const type = this.eventType();
    const food = this.selFood();
    const dessert = this.selDessert();
    const favors = this.selFavors();

    console.log(n)
    console.log(acts)
    console.log(type)
    console.log(food)
    console.log(dessert)
    console.log(favors)

    return this.catalog.vendors().filter(v => {

      console.log(v)
      if (v.minGuests && n < v.minGuests) return false;
      if (v.maxGuests && n > v.maxGuests) return false;

      // activity must match
      if (acts.size && !(v.activities ?? []).some(a => acts.has(a.id))) return false;


      // event type must be supported
      if (type && !(v.supportedEventTypes ?? []).includes(type)) return false;



      // Require at least one match
      // if (food.size && !(v.foodOptions ?? []).some(o => food.has(o.id))) return false;
      // if (dessert.size && !(v.dessertOptions ?? []).some(o => dessert.has(o.id))) return false;
      // if (favors.size && !(v.favorOptions ?? []).some(o => favors.has(o.id))) return false;

      return true;
    });
  });

  selectedVendors = computed(() =>
    this.catalog.vendors().filter(v => this.selectedVendorIds().has(v.id))
  );



  selectedVendorIds = signal<Set<string>>(new Set());

  toggleVendor(id: string) {
    const next = new Set(this.selectedVendorIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this.selectedVendorIds.set(next);
  }
  
  buildPlan(): EventPlan {
    const v = this.currentVendor()!;
const acts = [...this.selActivities()]
  .map(id => this.activities().find(x => x.id === id)!)
  .filter(Boolean);
    return {
      vendorId: v.id,
      vendorName: v.name,
      activities: acts.map(a => ({ id: a.id, title: a.title })),
      attendees: this.attendees(),
      eventType: this.eventType(),
      foodOptionIds: [...this.selFood()],
      dessertOptionIds: [...this.selDessert()],
      favorOptionIds: [...this.selFavors()],
      pricePerHead: this.pricePerHead(),
      lineItems: this.lineItems(),
      subtotal: this.subtotal(),
      depositPercent: this.depositPercent(),
      depositAmount: this.depositAmount(),
      total: this.total(),
    };
  }

  async submit() {
    const plan = this.buildPlan();
    console.log('SUBMIT', plan);
    // TODO: send to API + Stripe
  }

  // Collect unique event types from all vendors
  allEventTypes = computed(() => {
    const set = new Set<string>();
    this.catalog.vendors().forEach(v => {
      (v.supportedEventTypes ?? []).forEach(t => set.add(t));
    });
    return [...set];
  });

  // Collect all activities across vendors
  allActivities = computed<Activity[]>(() => {
    const acts: Activity[] = [];
    this.catalog.vendors().forEach(v => acts.push(...v.activities));
    return acts;
  });

}



function round2(n: number) { return Math.round(n * 100) / 100; }
function currency(n: number) { return `$${n.toFixed(2)}`; }