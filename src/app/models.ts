// models.ts
export type Money = number; // dollars (keep consistent everywhere)

export interface Vendor {
  id: string;
  name: string;
  logo?: string;
  banner?: string;
  blurb?: string;

  minGuests?: number;
  maxGuests?: number;

  defaultPricePerHead?: Money;

  supportedEventTypes?: string[];

  activities: Activity[];

  foodOptions?: Option[];
  dessertOptions?: Option[];
  favorOptions?: Option[];
}

export interface Activity {
  id: string;
  vendorId: string;
  title: string;
  image?: string;
  durationMinutes?: number;
  pricePerHead?: Money;
}

export interface Option {
  id: string;
  label: string;
  pricingType: 'perHead' | 'flat' | 'free';
  price?: Money;
}

/** Line items can optionally include vendor info (useful for grouping) */
export interface LineItem {
  vendorId?: string;
  vendor?: string;
  label: string;
  amount: Money;
}

export interface EventPlan {
  vendorIds: string[];              // ✅ multi-vendor compare
  vendorNames?: string[];

  activities: { id: string; title?: string }[];
  attendees: number;
  eventType: string;

  foodOptionIds: string[];
  dessertOptionIds: string[];
  favorOptionIds: string[];

  pricePerHead: Money;
  lineItems: LineItem[];

  subtotal: Money;
  depositPercent: number;
  depositAmount: Money;
  total: Money;
}

export interface EventWizardSettings {
  allowedVendorIds?: string[];
  preselectVendorId?: string | null;  // if you want to start with one vendor auto-selected
  depositPercent?: number;

  showFood?: boolean;
  showDessert?: boolean;
  showFavors?: boolean;
}
