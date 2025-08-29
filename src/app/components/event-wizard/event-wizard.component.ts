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
  activityId = signal<string | null>(null);
  attendees = signal<number>(0);
  eventType = signal<string>('Birthday');
  selFood = signal<Set<string>>(new Set());
  selDessert = signal<Set<string>>(new Set());
  selFavors = signal<Set<string>>(new Set());

  depositPercent = computed(() => this.settings.depositPercent ?? 0.2);

  // data
  vendors = computed<Vendor[]>(() => {
    const all = this.catalog.vendors();
    const allow = this.settings.allowedVendorIds;
    return allow?.length ? all.filter(v => allow.includes(v.id)) : all;
  });

  currentVendor = computed<Vendor | null>(() =>
    this.vendorId() ? this.catalog.getVendorById(this.vendorId()!) : null
  );
  activities = computed<Activity[]>(() => this.currentVendor()?.activities ?? []);
  pricePerHead = computed<number>(() => {
    const v = this.currentVendor();
    const a = this.activities().find(x => x.id === this.activityId());
    return (a?.pricePerHead ?? v?.defaultPricePerHead ?? 0);
  });

  lineItems = computed(() => {
    const n = this.attendees();
    const ids = this.selectedVendorIds();
    const items: { vendor: string; label: string; amount: number }[] = [];

    this.catalog.vendors().forEach(v => {
      if (!ids.has(v.id)) return;
      const base = n * (v.defaultPricePerHead ?? 0);
      items.push({ vendor: v.name, label: `Base (${n} × ${currency(v.defaultPricePerHead ?? 0)})`, amount: base });

      const addOpts = (ids: Set<string>, pool?: Option[], prefix?: string) => {
        (pool ?? []).forEach((opt: any) => {
          if (!ids.has(opt.id)) return;
          if (opt.pricingType === 'perHead') {
            items.push({ vendor: v.name, label: `${prefix} ${opt.label} (${n} × ${currency(opt.price)})`, amount: n * opt.price });
          } else {
            items.push({ vendor: v.name, label: `${prefix} ${opt.label}`, amount: opt.price });
          }
        });
      };

      addOpts(this.selFood(), v.foodOptions, 'Food:');
      addOpts(this.selDessert(), v.dessertOptions, 'Dessert:');
      addOpts(this.selFavors(), v.favorOptions, 'Favors:');
    });

    return items;
  });

  subtotal = computed(() => this.lineItems().reduce((s, li) => s + li.amount, 0));

  depositAmount = computed(() => round2(this.subtotal() * this.depositPercent()));
  total = computed(() => round2(this.subtotal()));

  constructor(private catalog: VendorService) {
    effect(() => {
      const pre = this.settings.preselectVendorId;
      if (pre && !this.vendorId()) {
        this.vendorId.set(pre);
      }
    });
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
      { key: 'food', show: this.settings.showFood ?? true, label: 'Food' },
      { key: 'dessert', show: this.settings.showDessert ?? true, label: 'Dessert' },
      { key: 'favors', show: this.settings.showFavors ?? true, label: 'Favors' },
      { key: 'vendors', show: true, label: 'Vendors' },   // <-- new step
      { key: 'review', show: true, label: 'Review' },
    ];
    return arr.filter(s => s.show);
  });

  matchedVendors = computed(() => {
    const n = this.attendees();
    const act = this.activityId();

    return this.catalog.vendors().filter(v => {
      if (v.minGuests && n < v.minGuests) return false;
      if (v.maxGuests && n > v.maxGuests) return false;
      if (act && !v.activities.some(a => a.id === act)) return false;
      return true;
    });
  });

  selectedVendorIds = signal<Set<string>>(new Set());

  toggleVendor(id: string) {
    const next = new Set(this.selectedVendorIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this.selectedVendorIds.set(next);
  }
  
  buildPlan(): EventPlan {
    const v = this.currentVendor()!;
    const a = this.activities().find(x => x.id === this.activityId()!)!;
    return {
      vendorId: v.id,
      vendorName: v.name,
      activityId: a.id,
      activityTitle: a.title,
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
}

function round2(n: number) { return Math.round(n * 100) / 100; }
function currency(n: number) { return `$${n.toFixed(2)}`; }