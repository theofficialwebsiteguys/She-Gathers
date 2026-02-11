import { CommonModule } from '@angular/common';
import { Component, Input, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VendorService } from '../../vendor.service';
import { Vendor, Activity, Option, EventPlan } from '../../models';

type StepKey =
  | 'intro'
  | 'guests'
  | 'type'
  | 'activity'
  | 'food'
  | 'dessert'
  | 'favors'
  | 'vendors'
  | 'review';

type ExperienceGroup = {
  vendor: Vendor;
  activities: Activity[];
};

@Component({
  selector: 'app-event-wizard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-wizard.component.html',
  styleUrl: './event-wizard.component.scss'
})
export class EventWizardComponent {
  @Input() settings = {};

  /* ---------------- UI ---------------- */
  step = signal(0);

  steps = [
    { key: 'intro', label: 'Intro' },
    { key: 'guests', label: 'Guests' },
    { key: 'type', label: 'Event Type' },
    { key: 'activity', label: 'Experience' },
    { key: 'food', label: 'Food' },
    { key: 'dessert', label: 'Dessert' },
    { key: 'favors', label: 'Favors' },
    { key: 'vendors', label: 'Vendors' },
    { key: 'review', label: 'Review' }
  ] as const;

  activeStepKey = computed<StepKey>(
    () => this.steps[this.step()]?.key ?? 'intro'
  );

  /* ---------------- USER INPUT ---------------- */
  attendees = signal(10);
  eventType = signal('');

  selActivities = signal<Set<string>>(new Set());
  selFood = signal<Set<string>>(new Set());
  selDessert = signal<Set<string>>(new Set());
  selFavors = signal<Set<string>>(new Set());

  selectedVendorIds = signal<Set<string>>(new Set());

  depositPercent = signal(0.5);

  constructor(private catalog: VendorService) {}

  /* ---------------- BASE DATA ---------------- */
  vendors = computed(() => this.catalog.vendors());

  /* ---------------- COLLECTIONS ---------------- */
  allEventTypes = computed(() => {
    const set = new Set<string>();
    for (const v of this.vendors()) {
      v.supportedEventTypes?.forEach(t => set.add(t));
    }
    return [...set];
  });

  allActivities = computed<Activity[]>(() =>
    this.vendors().flatMap(v => v.activities)
  );

  allFoodOptions = computed<Option[]>(() =>
    uniqueById(this.vendors().flatMap(v => v.foodOptions ?? []))
  );

  allDessertOptions = computed<Option[]>(() =>
    uniqueById(this.vendors().flatMap(v => v.dessertOptions ?? []))
  );

  allFavorOptions = computed<Option[]>(() =>
    uniqueById(this.vendors().flatMap(v => v.favorOptions ?? []))
  );

  /* ---------------- CACHED MATCH RESULTS ---------------- */
  matchedVendors = signal<Vendor[]>([]);
  fallbackVendors = signal<Vendor[]>([]);
  selectedVendors = signal<Vendor[]>([]);
  optionQuantities = signal<Record<string, number>>({});
  selectedVariants = signal<Record<string, string>>({});
  optionNotes = signal<Record<string, string>>({});


  constructorEffect = effect(() => {
    const vendors = this.vendors();
    const n = this.attendees();
    const acts = this.selActivities();
    const type = this.eventType();

    const matched: Vendor[] = [];
    const fallback: Vendor[] = [];

    for (const v of vendors) {
      let ok = true;

      if (v.minGuests && n < v.minGuests) ok = false;
      if (v.maxGuests && n > v.maxGuests) ok = false;

      if (acts.size) {
        const hasAct = v.activities.some(a => acts.has(a.id));
        if (!hasAct) ok = false;
      }

      if (type && v.supportedEventTypes?.length) {
        if (!v.supportedEventTypes.includes(type)) ok = false;
      }

      (ok ? matched : fallback).push(v);
    }

    this.matchedVendors.set(matched);
    this.fallbackVendors.set(fallback);

    this.selectedVendors.set(
      vendors.filter(v => this.selectedVendorIds().has(v.id))
    );
  });

  /* ---------------- PRICING ---------------- */
  lineItems = computed(() => {
    const n = this.attendees();
    const items: { vendorId: string; label: string; amount: number }[] = [];

    for (const v of this.selectedVendors()) {
      const acts = [...this.selActivities()]
        .map(id => v.activities.find(a => a.id === id))
        .filter(Boolean) as Activity[];

      if (acts.length) {
        let total = 0;

        for (const a of acts) {
          if (a.pricePerHead != null) {
            total += n * a.pricePerHead;
          } else if (a.priceFlat != null) {
            total += a.priceFlat;
          }
        }

        items.push({
          vendorId: v.id,
          label: acts.map(a => a.title).join(' + '),
          amount: total
        });

      }

      addOptions(
        items,
        n,
        v,
        this.selFood(),
        v.foodOptions,
        'Food',
        this.optionQuantities(),
        this.selectedVariants()
      );
      addOptions(items, n, v, this.selDessert(), v.dessertOptions, 'Dessert');
      addOptions(items, n, v, this.selFavors(), v.favorOptions, 'Favors');
    }

    return items;
  });

  isGroupSelected(group: ExperienceGroup): boolean {
    return group.activities.some(a =>
      this.selActivities().has(a.id)
    );
  }


  subtotal = computed(() =>
    this.lineItems().reduce((s, i) => s + i.amount, 0)
  );

  depositAmount = computed(() =>
    Math.round(this.subtotal() * this.depositPercent() * 100) / 100
  );

  /* ---------------- NAV ---------------- */
  canGoNext = computed(() => {
    switch (this.activeStepKey()) {
      case 'guests': return this.attendees() >= 10;
      case 'activity': return this.selActivities().size > 0;
      case 'vendors': return this.selectedVendorIds().size > 0;
      default: return true;
    }
  });

  groupedExperiences = computed<ExperienceGroup[]>(() => {
    const map = new Map<string, ExperienceGroup>();

    for (const v of this.vendors()) {
      if (!v.activities?.length) continue;

      map.set(v.id, {
        vendor: v,
        activities: v.activities
      });
    }

    return [...map.values()];
  });

  activeExperienceGroup = signal<ExperienceGroup | null>(null);

  openExperience(group: ExperienceGroup) {
    if (group.activities.length === 1) {
      this.toggle(this.selActivities, group.activities[0].id);
      return;
    }

    this.activeExperienceGroup.set(group);
  }

  closeExperience() {
    this.activeExperienceGroup.set(null);
  }


  next() {
    this.step.set(Math.min(this.step() + 1, this.steps.length - 1));
  }

  back() {
    this.step.set(Math.max(this.step() - 1, 0));
  }

  toggle(setSig: typeof this.selFood, id: string) {
    const s = new Set(setSig());
    s.has(id) ? s.delete(id) : s.add(id);
    setSig.set(s);
  }

  toggleVendor(id: string) {
    const s = new Set(this.selectedVendorIds());
    s.has(id) ? s.delete(id) : s.add(id);
    this.selectedVendorIds.set(s);
  }

  getLineItemsForVendor(id: string) {
    return this.lineItems().filter(li => li.vendorId === id);
  }

  submit() {
    console.log('FINAL PLAN', this.buildPlan());
  }

  buildPlan(): EventPlan {
    return {
      vendorIds: [...this.selectedVendorIds()],
      vendorNames: this.selectedVendors().map(v => v.name),
      activities: [...this.selActivities()].map(id => ({ id })),
      attendees: this.attendees(),
      eventType: this.eventType(),
      foodOptionIds: [...this.selFood()],
      dessertOptionIds: [...this.selDessert()],
      favorOptionIds: [...this.selFavors()],
      pricePerHead: this.attendees()
        ? Math.round((this.subtotal() / this.attendees()) * 100) / 100
        : 0,
      lineItems: this.lineItems(),
      subtotal: this.subtotal(),
      depositPercent: this.depositPercent(),
      depositAmount: this.depositAmount(),
      total: this.subtotal()
    };
  }

  setQuantity(optionId: string, value: number) {
    const copy = { ...this.optionQuantities() };
    copy[optionId] = Number(value);
    this.optionQuantities.set(copy);
  }

  selectVariant(optionId: string, variantId: string) {
    const copy = { ...this.selectedVariants() };
    copy[optionId] = variantId;
    this.selectedVariants.set(copy);
  }

  setNote(optionId: string, value: string) {
    const copy = { ...this.optionNotes() };
    copy[optionId] = value;
    this.optionNotes.set(copy);
  }

}

/* ---------------- HELPERS ---------------- */
function uniqueById<T extends { id: string }>(arr: T[]) {
  const map = new Map<string, T>();
  arr.forEach(v => map.set(v.id, v));
  return [...map.values()];
}

function addOptions(
  items: any[],
  n: number,
  v: Vendor,
  selected: Set<string>,
  pool?: Option[],
  prefix?: string,
  quantities?: Record<string, number>,
  selectedVariants?: Record<string, string>
) {
  (pool ?? []).forEach(opt => {
    if (!selected.has(opt.id)) return;

    let amount = 0;

    // Variant-based pricing
    if (opt.variants?.length) {
      const chosenVariantId = selectedVariants?.[opt.id];
      const variant = opt.variants.find(v => v.id === chosenVariantId);
      if (variant) amount = variant.price;
    }

    // Per head
    else if (opt.pricingType === 'perHead') {
      amount = n * (opt.price ?? 0);
    }

    // Per item (quantity based)
    else if (opt.pricingType === 'perItem') {
      const qty = quantities?.[opt.id] ?? 1;
      amount = qty * (opt.price ?? 0);
    }

    // Flat
    else {
      amount = opt.price ?? 0;
    }

    items.push({
      vendorId: v.id,
      label: `${prefix}: ${opt.label}`,
      amount
    });
  });
  
}
