// models.ts
export type Money = number; // dollars (keep consistent everywhere)

export interface Vendor {
  id: string;
  name: string;
  logo?: string;
  banner?: string;
  blurb?: string;
  /** Shown in wizard activity/vendor steps instead of blurb when present */
  activityBlurb?: string;

  minGuests?: number;
  maxGuests?: number;

  defaultPricePerHead?: Money;

  supportedEventTypes?: string[];

  /** Internal vendors (e.g. sg-catering) are excluded from vendor-selection UI */
  isInternal?: boolean;

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
  priceFlat?: number;
}

export interface Option {
[x: string]: any;
  id: string;
  label: string;

  /** Short description shown beneath the label (ingredients, serving info, etc.) */
  description?: string;

  /** Credit line shown beneath the option, e.g. "By Aura Juicery" */
  vendorCredit?: string;

  pricingType: 'flat' | 'perHead' | 'perItem';

  price?: number;

  variants?: {
    id: string;
    label: string;
    price: number;
  }[];

  /** If set, this option only appears when at least one of the listed parent option IDs is selected */
  parentOptionIds?: string[];

  maxQuantity?: number;

  allowQuantity?: boolean;

  allowNotes?: boolean;

  noteLabel?: string;
}


/** Line items can optionally include vendor info (useful for grouping) */
export interface LineItem {
  vendorId?: string;
  vendor?: string;
  label: string;
  amount: Money;
}

export interface EventPlan {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerNotes?: string;
  preferredDates?: string[];        // ISO date strings, up to 3

  vendorIds: string[];
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
