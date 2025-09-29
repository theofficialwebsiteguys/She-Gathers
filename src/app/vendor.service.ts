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
  supportedEventTypes: string[]; 
}
@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private vendorsSig = signal<Vendor[]>([
    {
      id: 'noir-candles',
      name: 'Noir Candles',
      logo: 'assets/vendors/candle-logo.png',
      banner: 'assets/store1.jpeg',
      blurb: `Join us for a fun and creative candle making workshop where you’ll learn how to craft your own custom soy candles from start to finish. 
Choose your scents, mix your wax, and pour your candle in a cozy, relaxed setting. Perfect for beginners, date nights, or a unique outing with friends. 
Workshop includes light refreshments & 15% off bouquet candles.`,
      defaultPricePerHead: 35,
      minGuests: 2,
      maxGuests: 20,
      supportedEventTypes: ['Birthday', 'Bachelorette', 'Team Night', 'Other'],
      activities: [
        {
          id: 'candle-workshop',
          vendorId: 'noir-candles',
          title: 'Candle Making Workshop',
          image: 'assets/store1.jpeg',
          durationMinutes: 90,
          pricePerHead: 35,
        },
      ],
      foodOptions: [
        { id: 'charcuterie', label: 'Charcuterie Board', pricingType: 'flat', price: 120 },
      ],
      dessertOptions: [
        { id: 'cupcakes', label: 'Cupcakes', pricingType: 'perHead', price: 5 },
      ],
      favorOptions: [
        { id: 'mini-candle', label: 'Mini Candle Favors', pricingType: 'perHead', price: 8 },
      ],
    },
    {
      id: 'cup-of-communittea',
      name: 'Cup of Communitea',
      banner: 'assets/store2.jpeg',
      blurb: `Step into the delicious world of tea with a guided, one-hour tasting experience. $30 per person (minimum 6 guests). Includes 3 curated teas and store discount.`,
      defaultPricePerHead: 30,
      minGuests: 6,
      maxGuests: 24,
      supportedEventTypes: ['Tea Social', 'Birthday', 'Other'],
      activities: [
        { id: 'tea-101', vendorId: 'cup-of-communittea', title: 'Tea 101 – Intro to Tea', image: 'assets/store2.jpeg', durationMinutes: 60, pricePerHead: 30 },
        { id: 'tea-world', vendorId: 'cup-of-communittea', title: 'Around the World – Global Teas', image: 'assets/store2.jpeg', durationMinutes: 60, pricePerHead: 30 },
        { id: 'tea-relax', vendorId: 'cup-of-communittea', title: 'Relaxation – Herbal Blends', image: 'assets/store2.jpeg', durationMinutes: 60, pricePerHead: 30 },
        { id: 'tea-dessert', vendorId: 'cup-of-communittea', title: 'Dessert Teas – Sweet Blends', image: 'assets/store2.jpeg', durationMinutes: 60, pricePerHead: 30 },
        { id: 'tea-purpose', vendorId: 'cup-of-communittea', title: 'Tea with a Purpose – Functional Teas', image: 'assets/store2.jpeg', durationMinutes: 60, pricePerHead: 30 },
        { id: 'tea-custom', vendorId: 'cup-of-communittea', title: 'Custom Theme – Your Choice', image: 'assets/store2.jpeg', durationMinutes: 60, pricePerHead: 30 },
      ],
      foodOptions: [
        { id: 'tea-snacks', label: 'Tea Snacks', pricingType: 'perHead', price: 12 },
      ],
      dessertOptions: [
        { id: 'cookies', label: 'Custom Cookies', pricingType: 'flat', price: 60 },
      ],
      favorOptions: [
        { id: 'tea-sampler', label: 'Tea Sampler Bag', pricingType: 'perHead', price: 6 },
      ],
    }
  ]);

  vendors = computed(() => this.vendorsSig());
  getVendorById = (id: string) => this.vendorsSig().find(v => v.id === id) ?? null;
}
