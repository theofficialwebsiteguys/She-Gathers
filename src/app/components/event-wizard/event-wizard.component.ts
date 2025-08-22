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

  // derived totals
  lineItems = computed(() => {
    const v = this.currentVendor();
    if (!v) return [];
    const n = this.attendees() || 0;
    const items: { label: string; amount: number }[] = [];

    const pph = this.pricePerHead();
    items.push({ label: `Base (${n} × ${currency(pph)})`, amount: n * pph });

    const addOptions = (ids: Set<string>, pool?: Option[], prefix?: string) => {
      (pool ?? []).forEach(opt => {
        if (!ids.has(opt.id)) return;
        if (opt.pricingType === 'perHead' && opt.price) {
          items.push({ label: `${prefix} ${opt.label} (${n} × ${currency(opt.price)})`, amount: n * opt.price });
        } else if (opt.pricingType === 'flat' && opt.price) {
          items.push({ label: `${prefix} ${opt.label}`, amount: opt.price });
        }
      });
    };

    addOptions(this.selFood(), v.foodOptions, 'Food:');
    addOptions(this.selDessert(), v.dessertOptions, 'Dessert:');
    addOptions(this.selFavors(), v.favorOptions, 'Favors:');

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

  toggle(setSig: typeof this.selFood, id: string) {
    const next = new Set(setSig());
    next.has(id) ? next.delete(id) : next.add(id);
    setSig.set(next);
  }

  next() { this.step.set(Math.min(this.step() + 1, this.steps().length - 1)); }
  back() { this.step.set(Math.max(this.step() - 1, 0)); }

  steps = computed(() => {
    const v = this.currentVendor();
    const arr = [
      { key: 'intro', show: !!v, label: 'Intro' },
      { key: 'vendor', show: !this.vendorId(), label: 'Choose Vendor' },
      { key: 'guests', show: true, label: 'Guests' },
      { key: 'type', show: true, label: 'Event Type' },
      { key: 'activity', show: (v?.activities?.length ?? 0) > 0, label: 'Activity' },
      { key: 'food', show: !!(this.settings.showFood ?? true) && (v?.foodOptions?.length ?? 0) > 0, label: 'Food' },
      { key: 'dessert', show: !!(this.settings.showDessert ?? true) && (v?.dessertOptions?.length ?? 0) > 0, label: 'Dessert' },
      { key: 'favors', show: !!(this.settings.showFavors ?? true) && (v?.favorOptions?.length ?? 0) > 0, label: 'Favors' },
      { key: 'review', show: true, label: 'Review' },
    ];
    return arr.filter(s => s.show);
  });

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