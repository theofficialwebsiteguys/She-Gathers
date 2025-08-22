import { computed, Injectable, signal } from '@angular/core';

export interface Activity {
  id: string;
  vendorId: string;
  title: string;
  image: string;
  durationMinutes: number;
  pricePerHead: number;
}

export interface Option {
  id: string;
  label: string;
  pricingType: 'flat' | 'perHead';
  price: number;
}

export interface Vendor {
  id: string;
  name: string;
  logo?: string;
  banner?: string;
  blurb?: string;
  defaultPricePerHead?: number;
  minGuests?: number;
  maxGuests?: number;
  activities: Activity[];
  foodOptions: Option[];
  dessertOptions: Option[];
  favorOptions: Option[];
}

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private vendorsSig = signal<Vendor[]>([
    {
      id: 'sg-candles',
      name: 'She Gathers Candle Studio',
      logo: 'assets/vendors/candle-logo.png',
      banner: 'assets/store1.jpeg',
      blurb: 'Hand-poured soy with custom scent blending.',
      defaultPricePerHead: 55,
      minGuests: 4,
      maxGuests: 24,
      activities: [
        { id: 'candle-101', vendorId: 'sg-candles', title: 'Candle Making 101', image: 'assets/store1.jpeg', durationMinutes: 75, pricePerHead: 60 },
        { id: 'candle-duo', vendorId: 'sg-candles', title: 'Candle + Wax Seals', image: 'assets/store2.jpeg', durationMinutes: 90, pricePerHead: 70 },
      ],
      foodOptions: [
        { id: 'board-sm', label: 'Small Charcuterie Board', pricingType: 'flat', price: 85 },
        { id: 'board-lg', label: 'Large Charcuterie Board', pricingType: 'flat', price: 140 },
        { id: 'tea-treats', label: 'Tea Sandwiches (per person)', pricingType: 'perHead', price: 12 },
      ],
      dessertOptions: [
        { id: 'mini-tarts', label: 'Mini Tarts Tray', pricingType: 'flat', price: 65 },
        { id: 'cupcakes', label: 'Cupcakes (per person)', pricingType: 'perHead', price: 6 },
      ],
      favorOptions: [
        { id: 'mini-candle', label: 'Mini Candle Favors', pricingType: 'perHead', price: 8 },
        { id: 'thank-card', label: 'Handwritten Thank-You Cards', pricingType: 'flat', price: 30 },
      ],
    },
    {
      id: 'sg-paint',
      name: 'She Gathers Paint Studio',
      logo: 'assets/vendors/candle-logo.png',
      banner: 'assets/store2.jpeg',
      blurb: 'Description for Paint Night.',
      defaultPricePerHead: 55,
      minGuests: 4,
      maxGuests: 24,
      activities: [
        { id: 'candle-101', vendorId: 'sg-candles', title: 'Candle Making 101', image: 'assets/store1.jpeg', durationMinutes: 75, pricePerHead: 60 },
        { id: 'candle-duo', vendorId: 'sg-candles', title: 'Candle + Wax Seals', image: 'assets/store2.jpeg', durationMinutes: 90, pricePerHead: 70 },
      ],
      foodOptions: [
        { id: 'board-sm', label: 'Small Charcuterie Board', pricingType: 'flat', price: 85 },
        { id: 'board-lg', label: 'Large Charcuterie Board', pricingType: 'flat', price: 140 },
        { id: 'tea-treats', label: 'Tea Sandwiches (per person)', pricingType: 'perHead', price: 12 },
      ],
      dessertOptions: [
        { id: 'mini-tarts', label: 'Mini Tarts Tray', pricingType: 'flat', price: 65 },
        { id: 'cupcakes', label: 'Cupcakes (per person)', pricingType: 'perHead', price: 6 },
      ],
      favorOptions: [
        { id: 'mini-candle', label: 'Mini Candle Favors', pricingType: 'perHead', price: 8 },
        { id: 'thank-card', label: 'Handwritten Thank-You Cards', pricingType: 'flat', price: 30 },
      ],
    },
    {
      id: 'sg-flower',
      name: 'She Gathers Flower Studio',
      logo: 'assets/vendors/candle-logo.png',
      banner: 'assets/store3.jpeg',
      blurb: 'Description for Flower Making.',
      defaultPricePerHead: 55,
      minGuests: 4,
      maxGuests: 24,
      activities: [
        { id: 'candle-101', vendorId: 'sg-candles', title: 'Candle Making 101', image: 'assets/store1.jpeg', durationMinutes: 75, pricePerHead: 60 },
        { id: 'candle-duo', vendorId: 'sg-candles', title: 'Candle + Wax Seals', image: 'assets/store2.jpeg', durationMinutes: 90, pricePerHead: 70 },
      ],
      foodOptions: [
        { id: 'board-sm', label: 'Small Charcuterie Board', pricingType: 'flat', price: 85 },
        { id: 'board-lg', label: 'Large Charcuterie Board', pricingType: 'flat', price: 140 },
        { id: 'tea-treats', label: 'Tea Sandwiches (per person)', pricingType: 'perHead', price: 12 },
      ],
      dessertOptions: [
        { id: 'mini-tarts', label: 'Mini Tarts Tray', pricingType: 'flat', price: 65 },
        { id: 'cupcakes', label: 'Cupcakes (per person)', pricingType: 'perHead', price: 6 },
      ],
      favorOptions: [
        { id: 'mini-candle', label: 'Mini Candle Favors', pricingType: 'perHead', price: 8 },
        { id: 'thank-card', label: 'Handwritten Thank-You Cards', pricingType: 'flat', price: 30 },
      ],
    },
    {
      id: 'sg-tea',
      name: 'She Gathers Tea House',
      banner: 'assets/store1.jpeg',
      blurb: 'Modern tea service with seasonal pairings.',
      defaultPricePerHead: 45,
      activities: [
        { id: 'tea-class', vendorId: 'sg-tea', title: 'Tea Tasting & Pairing', image: 'assets/acts/tea.jpg', durationMinutes: 60, pricePerHead: 45 },
      ],
      foodOptions: [
        { id: 'scones', label: 'Scones & Jam (pp)', pricingType: 'perHead', price: 7 }
      ],
      dessertOptions: [
        { id: 'petit-fours', label: 'Petit Fours Tray', pricingType: 'flat', price: 55 }
      ],
      favorOptions: [
        { id: 'tea-sampler', label: 'Tea Sampler (pp)', pricingType: 'perHead', price: 5 }
      ],
    }
  ]);

  vendors = computed(() => this.vendorsSig());
  getVendorById = (id: string) => this.vendorsSig().find(v => v.id === id) ?? null;
}
