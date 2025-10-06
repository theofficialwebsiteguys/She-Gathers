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
      logo: 'assets/vendors/noir-candles.jpg',
      banner: 'assets/vendors/noir-candles.jpg',
      blurb: `Join us for a fun and creative candle making workshop where you’ll learn how to craft your own custom soy candles from start to finish. 
Choose your scents, mix your wax, and pour your candle in a cozy, relaxed setting. Perfect for beginners, date nights, or a unique outing with friends. 
Workshop includes light refreshments & 15% off bouquet candles.`,
      defaultPricePerHead: 35,
      minGuests: 2,
      maxGuests: 100,
      supportedEventTypes: ['Birthday', 'Bachelorette', 'Team Night', 'Other'],
      activities: [
        {
          id: 'candle-workshop',
          vendorId: 'noir-candles',
          title: 'Candle Making Workshop',
          image: 'assets/vendors/noir-candles.jpg',
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
      banner: 'assets/gallery/65.jpg',
      blurb: `Step into the delicious world of tea with a guided, one-hour tasting experience. $30 per person (minimum 6 guests). Includes 3 curated teas and store discount.`,
      defaultPricePerHead: 30,
      minGuests: 2,
      maxGuests: 100,
      supportedEventTypes: ['Tea Social', 'Birthday', 'Other'],
      activities: [
        { id: 'tea-101', vendorId: 'cup-of-communittea', title: 'Tea 101 – Intro to Tea', image: 'assets/gallery/65.jpg', durationMinutes: 60, pricePerHead: 30 },
        { id: 'tea-world', vendorId: 'cup-of-communittea', title: 'Around the World – Global Teas', image: 'assets/gallery/65.jpg', durationMinutes: 60, pricePerHead: 30 },
        { id: 'tea-relax', vendorId: 'cup-of-communittea', title: 'Relaxation – Herbal Blends', image: 'assets/gallery/65.jpg', durationMinutes: 60, pricePerHead: 30 },
        { id: 'tea-dessert', vendorId: 'cup-of-communittea', title: 'Dessert Teas – Sweet Blends', image: 'assets/gallery/65.jpg', durationMinutes: 60, pricePerHead: 30 },
        { id: 'tea-purpose', vendorId: 'cup-of-communittea', title: 'Tea with a Purpose – Functional Teas', image: 'assets/gallery/65.jpg', durationMinutes: 60, pricePerHead: 30 },
        { id: 'tea-custom', vendorId: 'cup-of-communittea', title: 'Custom Theme – Your Choice', image: 'assets/gallery/65.jpg', durationMinutes: 60, pricePerHead: 30 },
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
    },
    {
      id: 'emotional-support-peens',
      name: 'Emotional Support Peens',
      banner: 'assets/vendors/emotional-support-peens.jpg',
      blurb: `Looking for an unforgettable party favor or conversation starter? Add a dose of humor and handcrafted charm with Emotional Support Peens from This Darn Yarn. These tiny crocheted creations are part of our After Dark line—perfect for bachelorette parties, gag gifts, wellness retreats, or any event where a little laughter and support is needed!`,
      defaultPricePerHead: 20,
      minGuests: 2,
      maxGuests: 20,
      supportedEventTypes: ['Tea Social', 'Birthday', 'Bachelorette', 'Other'],
      activities: [
        { id: 'peen-crochet', vendorId: 'emotional-support-peens', title: 'Emotional Support Peens', image: 'assets/vendors/emotional-support-peens.jpg', durationMinutes: 60, pricePerHead: 20 },
      ],
      foodOptions: [

      ],
      dessertOptions: [

      ],
      favorOptions: [

      ],
    },
    {
      id: 'green-room-linens',
      name: 'Green Room Linens',
      banner: 'assets/vendors/green-room-linens.jpg',
      blurb: `Lean into a zero waste lifestyle by creating new items from reclaimed and repurposed linens! `,
      defaultPricePerHead: 25,
      minGuests: 4,
      maxGuests: 100,
      supportedEventTypes: ['Tea Social', 'Birthday', 'Bachelorette', 'Other'],
      activities: [
        { id: 'furoshiki', vendorId: 'green-room-linens', title: 'Learn the variety of ways to wrap gifts using cloth wrapping paper, leave with 4 sheets of gift wrap and 4 methods of wrapping', image: 'assets/vendors/green-room-linens.jpg', durationMinutes: 60, pricePerHead: 25 },
        { id: 'laundry-bags', vendorId: 'green-room-linens', title: 'Create your own travel laundry bag using a pillow case and some ribbon - no sewing required!!', image: 'assets/vendors/green-room-linens.jpg', durationMinutes: 60, pricePerHead: 25 },
      ],
      foodOptions: [

      ],
      dessertOptions: [

      ],
      favorOptions: [

      ],
    },
  ]);

  vendors = computed(() => this.vendorsSig());
  getVendorById = (id: string) => this.vendorsSig().find(v => v.id === id) ?? null;
}
