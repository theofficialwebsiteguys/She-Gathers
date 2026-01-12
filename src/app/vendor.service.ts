import { computed, Injectable, signal } from '@angular/core';
import { Vendor } from './models';

@Injectable({ providedIn: 'root' })
export class VendorService {
  private _vendors = signal<Vendor[]>([
    {
      id: 'noir-candles',
      name: 'Noir Candles',
      logo: 'assets/vendors/noir-candles.jpg',
      banner: 'assets/vendors/noir-candles.jpg',
      blurb: `Join us for a fun and creative candle making workshop...`,
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
          pricePerHead: 35
        }
      ],
      foodOptions: [
        { id: 'charcuterie', label: 'Charcuterie Board', pricingType: 'flat', price: 120 }
      ],
      dessertOptions: [
        { id: 'cupcakes', label: 'Cupcakes', pricingType: 'perHead', price: 5 }
      ],
      favorOptions: [
        { id: 'mini-candle', label: 'Mini Candle Favors', pricingType: 'perHead', price: 8 }
      ]
    },

    {
      id: 'cup-of-communittea',
      name: 'Cup of Communitea',
      banner: 'assets/gallery/65.jpg',
      blurb: `Step into the delicious world of tea...`,
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
        { id: 'tea-custom', vendorId: 'cup-of-communittea', title: 'Custom Theme – Your Choice', image: 'assets/gallery/65.jpg', durationMinutes: 60, pricePerHead: 30 }
      ],
      foodOptions: [
        { id: 'tea-snacks', label: 'Tea Snacks', pricingType: 'perHead', price: 12 }
      ],
      dessertOptions: [
        { id: 'cookies', label: 'Custom Cookies', pricingType: 'flat', price: 60 }
      ],
      favorOptions: [
        { id: 'tea-sampler', label: 'Tea Sampler Bag', pricingType: 'perHead', price: 6 }
      ]
    },

    {
      id: 'emotional-support-peens',
      name: 'Emotional Support Peens',
      banner: 'assets/vendors/emotional-support-peens.jpg',
      blurb: `Looking for an unforgettable party favor...`,
      defaultPricePerHead: 20,
      minGuests: 2,
      maxGuests: 20,
      supportedEventTypes: ['Tea Social', 'Birthday', 'Bachelorette', 'Other'],
      activities: [
        { id: 'peen-crochet', vendorId: 'emotional-support-peens', title: 'Emotional Support Peens', image: 'assets/vendors/emotional-support-peens.jpg', durationMinutes: 60, pricePerHead: 20 }
      ],
      foodOptions: [],
      dessertOptions: [],
      favorOptions: []
    },

    {
      id: 'green-room-linens',
      name: 'Green Room Linens',
      banner: 'assets/vendors/green-room-linens.jpg',
      blurb: `Lean into a zero waste lifestyle...`,
      defaultPricePerHead: 25,
      minGuests: 4,
      maxGuests: 100,
      supportedEventTypes: ['Tea Social', 'Birthday', 'Bachelorette', 'Other'],
      activities: [
        { id: 'furoshiki', vendorId: 'green-room-linens', title: 'Gift wrapping with cloth', image: 'assets/vendors/green-room-linens.jpg', durationMinutes: 60, pricePerHead: 25 },
        { id: 'laundry-bags', vendorId: 'green-room-linens', title: 'No-sew travel laundry bag', image: 'assets/vendors/green-room-linens.jpg', durationMinutes: 60, pricePerHead: 25 }
      ],
      foodOptions: [],
      dessertOptions: [],
      favorOptions: []
    },

    {
      id: 'sourdough-by-amanda',
      name: 'Sourdough by Amanda',
      banner: 'assets/vendors/sourdough.jpeg',
      blurb: `Sourdough by Amanda is an all-sourdough bakery...`,
      defaultPricePerHead: 4,
      minGuests: 6,
      maxGuests: 100,
      supportedEventTypes: ['Tea Social', 'Birthday', 'Brunch', 'Other'],
      activities: [
        { id: 'sourdough-tasting', vendorId: 'sourdough-by-amanda', title: 'Sourdough Bakery Selection', image: 'assets/vendors/sourdough.jpeg', durationMinutes: 60, pricePerHead: 4 }
      ],
      foodOptions: [
        { id: 'mini-loaves', label: 'Mini Sourdough Loaves', pricingType: 'perHead', price: 4 },
        { id: 'cinnamon-rolls', label: 'Cinnamon Rolls', pricingType: 'perHead', price: 5 },
        { id: 'scones', label: 'Scones', pricingType: 'perHead', price: 3 },
        { id: 'muffins', label: 'Muffins', pricingType: 'perHead', price: 2 },
        { id: 'bagels', label: 'Bagels', pricingType: 'perHead', price: 2 }
      ],
      dessertOptions: [],
      favorOptions: []
    },

    {
      id: 'kaliope-at-home-catering',
      name: "Kaliope's At Home Catering",
      banner: 'assets/vendors/kaliopes.jpg',
      blurb: `At Kaliope's At Home Catering...`,
      defaultPricePerHead: 14,
      minGuests: 6,
      maxGuests: 100,
      supportedEventTypes: ['Birthday', 'Bachelorette', 'Brunch', 'Team Night', 'Other'],
      activities: [
        { id: 'charcuterie-cups', vendorId: 'kaliope-at-home-catering', title: 'Create Your Own Charcuterie Cups', image: 'assets/vendors/kaliopes.jpg', durationMinutes: 60, pricePerHead: 14 },
        { id: 'chicken-souvlaki-bar', vendorId: 'kaliope-at-home-catering', title: 'Chicken Souvlaki Bar', image: 'assets/vendors/kaliopes.jpg', durationMinutes: 90, pricePerHead: 16 },
        { id: 'gyro-bar', vendorId: 'kaliope-at-home-catering', title: 'Build Your Own Gyro Bar', image: 'assets/vendors/kaliopes.jpg', durationMinutes: 90, pricePerHead: 14 }
      ],
      foodOptions: [
        { id: 'add-side', label: 'Add a Side', pricingType: 'perHead', price: 3 }
      ],
      dessertOptions: [],
      favorOptions: []
    },

    {
      id: 'clean-bee-organics',
      name: 'The Clean Bee Organics',
      banner: 'assets/vendors/essential-oil.jpg',
      blurb: `Learn the basics of essential oils...`,
      defaultPricePerHead: 30,
      minGuests: 6,
      maxGuests: 30,
      supportedEventTypes: ['Wellness', 'Birthday', 'Bachelorette', 'Other'],
      activities: [
        { id: 'essential-oils-intro', vendorId: 'clean-bee-organics', title: 'Essential Oils & DIY Roller', image: 'assets/vendors/essential-oil.jpg', durationMinutes: 60, pricePerHead: 30 }
      ],
      foodOptions: [],
      dessertOptions: [],
      favorOptions: [
        { id: 'extra-roller', label: 'Additional Custom Roller', pricingType: 'flat', price: 15 }
      ]
    }
  ]);
  
  readonly vendors = this._vendors.asReadonly();

  getVendorById(id: string) {
    return this._vendors().find(v => v.id === id) ?? null;
  }
}
