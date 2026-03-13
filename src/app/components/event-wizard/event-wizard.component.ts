import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VendorService } from '../../vendor.service';
import { Vendor, Activity, Option, EventPlan, EventWizardSettings } from '../../models';
import { BookingService } from '../../services/payment.service';

type StepKey =
  | 'intro'
  | 'guests'
  | 'type'
  | 'activity'
  | 'food'
  | 'dessert'
  | 'favors'
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
export class EventWizardComponent implements OnChanges {
  @Input() settings: EventWizardSettings = {};
  @Input() backendUrl = 'http://localhost:3000/api';

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
    { key: 'review', label: 'Review' }
  ] as const;

  activeStepKey = computed<StepKey>(
    () => this.steps[this.step()]?.key ?? 'intro'
  );

  /* ---------------- USER INPUT ---------------- */
  attendees = signal(10);
  eventType = signal('');
  customerName = signal('');
  customerEmail = signal('');

  selActivities = signal<Set<string>>(new Set());
  noExperience = signal(false);
  selFood = signal<Set<string>>(new Set());
  selDessert = signal<Set<string>>(new Set());
  selFavors = signal<Set<string>>(new Set());

  /** Auto-derived: whichever vendors own a selected activity. */
  selectedVendorIds = computed<Set<string>>(() => {
    const ids = new Set<string>();
    for (const v of this.vendors()) {
      if (v.isInternal) continue;
      if (v.activities.some(a => this.selActivities().has(a.id))) {
        ids.add(v.id);
      }
    }
    return ids;
  });

  depositPercent = signal(0.5);

  /* ---------------- BOOKING ---------------- */
  reviewView    = signal<'summary' | 'booking'>('summary');
  bookingStatus = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');
  bookingError  = signal('');
  contactError  = signal('');

  customerPhone = signal('');
  customerNotes = signal('');
  preferredDates = signal<string[]>([]);
  readonly today = new Date().toISOString().split('T')[0];

  constructor(private catalog: VendorService, private bookingService: BookingService, private el: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['settings']) {
      const s = changes['settings'].currentValue as EventWizardSettings;
      if (s?.depositPercent != null) {
        this.depositPercent.set(s.depositPercent);
      }
    }
  }

  /* ---------------- BASE DATA ---------------- */
  vendors = computed(() => this.catalog.vendors());

  /** Vendors that can be booked as an experience (have activities, not internal). */
  experienceVendors = computed(() =>
    this.vendors().filter(v => !v.isInternal && v.activities.length > 0)
  );

  /** Product-only vendors (no activities, not internal) — favor/dessert/food only. */
  productOnlyVendors = computed(() =>
    this.vendors().filter(v => !v.isInternal && v.activities.length === 0)
  );

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

  allFoodOptions = computed<Option[]>(() => {
    const sgCatering = this.vendors().find(v => v.id === 'sg-catering');
    return sgCatering?.foodOptions ?? [];
  });

  /** Food options ordered so each child option immediately follows its parent (only when parent is selected) */
  visibleFoodOptions = computed<Option[]>(() => {
    const food = this.selFood();
    const all = this.allFoodOptions();
    const result: Option[] = [];

    for (const opt of all) {
      if (opt.parentOptionIds?.length) continue; // children are inserted after their parent below
      result.push(opt);
      if (food.has(opt.id)) {
        const children = all.filter(o => o.parentOptionIds?.includes(opt.id));
        result.push(...children);
      }
    }

    return result;
  });

  allDessertOptions = computed<Option[]>(() =>
    uniqueById(this.vendors().flatMap(v => v.dessertOptions ?? []))
  );

  allFavorOptions = computed<Option[]>(() =>
    uniqueById(this.vendors().flatMap(v => v.favorOptions ?? []))
  );

  /* ---------------- CACHED MATCH RESULTS ---------------- */
  matchedVendors = signal<Vendor[]>([]);
  fallbackVendors = signal<Vendor[]>([]);

  /** Auto-derived from selectedVendorIds. */
  selectedVendors = computed<Vendor[]>(() =>
    this.vendors().filter(v => this.selectedVendorIds().has(v.id))
  );
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
      if (v.isInternal) continue;       // catering / internal — never in vendor step
      if (!v.activities.length) continue; // favor/product-only vendors — not bookable experiences

      let ok = true;

      if (v.minGuests && n < v.minGuests) ok = false;
      if (v.maxGuests && n > v.maxGuests) ok = false;

      if (acts.size) {
        const hasAct = v.activities.some(a => acts.has(a.id));
        if (!hasAct) ok = false;
      }

      // Only filter by event type when no activities are selected.
      // If the user already picked activities from this vendor, don't exclude it.
      if (!acts.size && type && v.supportedEventTypes?.length) {
        if (!v.supportedEventTypes.includes(type)) ok = false;
      }

      (ok ? matched : fallback).push(v);
    }

    this.matchedVendors.set(matched);
    this.fallbackVendors.set(fallback);
  });

  reviewEffect = effect(() => {
    if (this.activeStepKey() !== 'review') {
      this.reviewView.set('summary');
      this.bookingStatus.set('idle');
      this.bookingError.set('');
      this.contactError.set('');
    }
  });

  /* ---------------- PRICING ---------------- */
  lineItems = computed(() => {
    const n = this.attendees();
    const items: { vendorId: string; label: string; amount: number }[] = [];

    // 1. Activity costs + food — only for the experience vendors the user selected
    for (const v of this.selectedVendors()) {
      const acts = [...this.selActivities()]
        .map(id => v.activities.find(a => a.id === id))
        .filter(Boolean) as Activity[];

      if (acts.length) {
        let total = 0;
        for (const a of acts) {
          if (a.pricePerHead != null) total += n * a.pricePerHead;
          else if (a.priceFlat != null) total += a.priceFlat;
        }
        items.push({
          vendorId: v.id,
          label: acts.map(a => a.title).join(' + '),
          amount: total
        });
      }

      addOptions(items, n, v, this.selFood(), v.foodOptions, this.optionQuantities(), this.selectedVariants());
    }

    // 2. She Gathers catering food — always available regardless of experience selection
    const sgCatering = this.vendors().find(v => v.id === 'sg-catering');
    if (sgCatering) {
      addOptions(items, n, sgCatering, this.selFood(), sgCatering.foodOptions, this.optionQuantities(), this.selectedVariants());
    }

    // 3. Product-only vendor food (no activities, not internal)
    for (const v of this.vendors()) {
      if (v.isInternal || v.activities.length > 0) continue;
      addOptions(items, n, v, this.selFood(), v.foodOptions, this.optionQuantities(), this.selectedVariants());
    }

    // 4. Dessert & favor add-ons — always available from ALL vendors regardless of
    //    which experience vendor is selected (these are universal extras, not tied to the activity)
    for (const v of this.vendors()) {
      if (v.isInternal) continue;
      addOptions(items, n, v, this.selDessert(), v.dessertOptions);
      addOptions(items, n, v, this.selFavors(), v.favorOptions, this.optionQuantities(), this.selectedVariants());
    }

    return items;
  });

  /** All vendors (including internal) that have at least one priced line item. */
  vendorsWithLineItems = computed<Vendor[]>(() => {
    const vendorIds = new Set(this.lineItems().map(li => li.vendorId));
    return this.vendors().filter(v => vendorIds.has(v.id));
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
      case 'activity': return this.selActivities().size > 0 || this.noExperience();
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
    this.noExperience.set(false);
    if (group.activities.length === 1) {
      this.toggle(this.selActivities, group.activities[0].id);
      return;
    }

    this.activeExperienceGroup.set(group);
  }

  selectNoExperience() {
    this.noExperience.set(true);
    this.selActivities.set(new Set());
  }

  closeExperience() {
    this.activeExperienceGroup.set(null);
  }


  next() {
    this.step.set(Math.min(this.step() + 1, this.steps.length - 1));
    this.scrollToTop();
  }

  back() {
    this.step.set(Math.max(this.step() - 1, 0));
    this.scrollToTop();
  }

  private scrollToTop() {
    this.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggle(setSig: typeof this.selFood, id: string) {
    const s = new Set(setSig());
    s.has(id) ? s.delete(id) : s.add(id);
    setSig.set(s);
  }

  getLineItemsForVendor(id: string) {
    return this.lineItems().filter(li => li.vendorId === id);
  }

  proceedToBooking() {
    this.reviewView.set('booking');
  }

  submitBooking() {
    const name  = this.customerName().trim();
    const email = this.customerEmail().trim();
    const phone = this.customerPhone().trim();

    if (!name || !email || !phone) {
      this.contactError.set('Please enter your name, email address, and phone number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.contactError.set('Please enter a valid email address.');
      return;
    }
    if (this.preferredDates().length === 0) {
      this.contactError.set('Please select at least one preferred date.');
      return;
    }
    this.contactError.set('');
    this.bookingStatus.set('submitting');
    this.bookingError.set('');

    this.bookingService.requestBooking(this.backendUrl, this.buildPlan()).subscribe({
      next: () => this.bookingStatus.set('success'),
      error: (err) => {
        this.bookingError.set(err.error?.message || 'Booking request could not be sent. Please try again.');
        this.bookingStatus.set('error');
      }
    });
  }

  addPreferredDate(value: string) {
    if (!value || this.preferredDates().length >= 3 || this.preferredDates().includes(value)) return;
    this.preferredDates.set([...this.preferredDates(), value]);
  }

  removePreferredDate(index: number) {
    const dates = [...this.preferredDates()];
    dates.splice(index, 1);
    this.preferredDates.set(dates);
  }

  formatDate(iso: string): string {
    const [y, m, d] = iso.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[+m - 1]} ${+d}, ${y}`;
  }

  buildPlan(): EventPlan {
    return {
      customerName:   this.customerName(),
      customerEmail:  this.customerEmail(),
      customerPhone:  this.customerPhone(),
      customerNotes:  this.customerNotes(),
      preferredDates: this.preferredDates(),
      vendorIds:   [...this.selectedVendorIds()],
      vendorNames: this.selectedVendors().map(v => v.name),
      activities:  [...this.selActivities()].map(id => ({ id })),
      attendees:   this.attendees(),
      eventType:   this.eventType(),
      foodOptionIds:    [...this.selFood()],
      dessertOptionIds: [...this.selDessert()],
      favorOptionIds:   [...this.selFavors()],
      pricePerHead: this.attendees()
        ? Math.round((this.subtotal() / this.attendees()) * 100) / 100
        : 0,
      lineItems:      this.lineItems(),
      subtotal:       this.subtotal(),
      depositPercent: this.depositPercent(),
      depositAmount:  this.depositAmount(),
      total:          this.subtotal()
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
  quantities?: Record<string, number>,
  selectedVariants?: Record<string, string>
) {
  (pool ?? []).forEach(opt => {
    if (!selected.has(opt.id)) return;

    let amount = 0;

    // Variant-based pricing — skip if no variant chosen yet
    if (opt.variants?.length) {
      const chosenVariantId = selectedVariants?.[opt.id];
      const variant = opt.variants.find(vr => vr.id === chosenVariantId);
      if (!variant) return;
      amount = variant.price;
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
      label: opt.label,
      amount
    });
  });
}
