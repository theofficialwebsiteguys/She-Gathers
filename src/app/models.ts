// models.ts
export type Money = number; // cents or dollars—pick one and be consistent

export interface Vendor {
  id: string;
  name: string;
  logo?: string;
  banner?: string;
  blurb?: string;
  minGuests?: number;
  maxGuests?: number;
  // If all activities share the same price/head you can fill this,
  // otherwise price lives on Activity
  defaultPricePerHead?: Money;
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
  pricePerHead?: Money; // overrides vendor default if present
}

export interface Option {
  id: string;
  label: string;
  // per person add-on, flat add-on, or free
  pricingType: 'perHead' | 'flat' | 'free';
  price?: Money; // interpret based on pricingType
}

export interface EventPlan {
  vendorId: string;
  vendorName?: string;
  activities: { id: string; title?: string }[];
  activityTitle?: string;
  attendees: number;
  eventType: 'Birthday' | 'Bachelorette' | 'Other' | string;
  foodOptionIds: string[];
  dessertOptionIds: string[];
  favorOptionIds: string[];
  // derived totals
  pricePerHead: Money;
  lineItems: { label: string; amount: Money }[];
  subtotal: Money;
  depositPercent: number; // 0.2 = 20%
  depositAmount: Money;
  total: Money;
}

export interface EventWizardSettings {
  allowedVendorIds?: string[];        // limit selection
  preselectVendorId?: string | null;  // skip vendor step if present
  depositPercent?: number;            // default 0.2 (20%)
  showFood?: boolean;                 // default true
  showDessert?: boolean;              // default true
  showFavors?: boolean;               // default true
}
