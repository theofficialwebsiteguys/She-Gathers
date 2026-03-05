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
      blurb: `Join us for a fun and creative candle making workshop where you'll learn how to craft your own custom soy candles from start to finish.`,
      defaultPricePerHead: 35,
      minGuests: 10,
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
      foodOptions: [],
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
      blurb: `Step into the delicious world of tea with a guided, one-hour tasting experience hosted by Cup of Communitea.`,
      defaultPricePerHead: 30,
      minGuests: 10,
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
      foodOptions: [],
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

      defaultPricePerHead: 0,
      minGuests: 1,
      maxGuests: 20,
      supportedEventTypes: ['Birthday','Bachelorette','Other'],

      activities: [],

      foodOptions: [],
      dessertOptions: [],

      favorOptions: [
        {
          id: 'peens',
          label: 'Emotional Support Peen',
          description: `Colors are based on current yarn availability. Available colors may include pink, brown, cream, and tan. Please note your preferred color(s) below, and This Darn Yarn will do her best to accommodate — however, color fulfillment is not guaranteed and will depend on what is available at the time of your order.`,
          pricingType: 'perItem',
          price: 20,
          allowQuantity: true,
          maxQuantity: 20,
          allowNotes: true,
          noteLabel: 'Preferred Color(s)'
        }
      ]
    },


    {
      id: 'green-room-linens',
      name: 'Green Room Linens',
      banner: 'assets/vendors/green-room-linens.jpg',
      blurb: `Lean into a zero waste lifestyle by creating new items from reclaimed and repurposed linens! `,
      defaultPricePerHead: 25,
      minGuests: 10,
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
      blurb: `Sourdough by Amanda is an all sourdough bakery based out of Grans Island, NY. We bring gut healthy delicious treats right to you with the freshest ingredients and seasonal flavors`,
      defaultPricePerHead: 4,
      minGuests: 10,
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
      id: 'clean-bee-organics',
      name: 'The Clean Bee Organics',
      banner: 'assets/vendors/essential-oil.jpg',
      blurb: `Essential oils interact with your body and mind in different ways and can offer many therapeutic benefits- improve mood, support sleep, reduce stress and tension, promote clarity and aid in healing.`,
      defaultPricePerHead: 30,
      minGuests: 10,
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
    },
    {
      id: 'read-it-and-eat',
      name: 'Read It & Eat Bookshop',
      banner: 'assets/vendors/read-it-and-eat.jpg',
      blurb: `Read It & Eat Bookshop offers curated private events centered around books, food, and meaningful conversation. From book club collaborations to hands-on cooking classes, each experience is thoughtfully designed to bring people together.`,
      defaultPricePerHead: 45,
      minGuests: 10,
      maxGuests: 40,
      supportedEventTypes: ['Book Club', 'Cooking Class', 'Private Dinner', 'Other'],
      activities: [
        {
          id: 'book-club-collaboration',
          vendorId: 'read-it-and-eat',
          title: 'Private Book Club & Cookbook Collaboration',
          image: 'assets/vendors/read-it-and-eat.jpg',
          durationMinutes: 90,
          pricePerHead: 45
        },
        {
          id: 'private-cooking-class',
          vendorId: 'read-it-and-eat',
          title: 'Private Cooking Class or Supper Club',
          image: 'assets/vendors/read-it-and-eat.jpg',
          durationMinutes: 120,
          pricePerHead: 65
        }
      ],
      foodOptions: [],
      dessertOptions: [],
      favorOptions: []
    },

    {
      id: 'cookie-events',
      name: 'Tierney Town Treats',
      banner: 'assets/vendors/tierney.jpg',
      blurb: `Cookie Events offers elevated cookie decorating experiences for kids, teens, and adults—ranging from playful cookie parties to refined hands-on decorating classes and custom edible displays.`,
      defaultPricePerHead: 60,
      minGuests: 10,
      maxGuests: 50,
      supportedEventTypes: ['Birthday', 'Kids Party', 'Workshop', 'Other'],
      activities: [
        {
          id: 'cookie-party-kids',
          vendorId: 'cookie-events',
          title: 'Cookie Decorating Party (Ages 4+)',
          image: 'assets/vendors/store2.jpeg',
          durationMinutes: 60,
          pricePerHead: 15
        },
        {
          id: 'cookie-decorating-class',
          vendorId: 'cookie-events',
          title: 'Cookie Decorating Class (Ages 12+)',
          image: 'assets/vendors/store2.jpeg',
          durationMinutes: 90,
          pricePerHead: 60
        },
        {
          id: 'custom-cookies',
          vendorId: 'cookie-events',
          title: 'Custom Sugar Cookies (per dozen)',
          image: 'assets/vendors/store2.jpeg',
          durationMinutes: 0,
          priceFlat: 60
        },
        {
          id: 'flour-bar-rental',
          vendorId: 'cookie-events',
          title: 'Flour Bar Rental',
          image: 'assets/vendors/store2.jpeg',
          durationMinutes: 60,
          priceFlat: 350
        }
      ],
      foodOptions: [],
      dessertOptions: [],
      favorOptions: []
    },



    // ─── She Gathers Catering ───────────────────────────────────────────────
    // Internal vendor: food options are always available regardless of which
    // experience vendor is selected. Not shown in the vendor-selection step.
    {
      id: 'sg-catering',
      name: 'She Gathers Catering',
      isInternal: true,
      activities: [],
      foodOptions: [
        // ── Charcuterie Trays ──────────────────────────────────────────────
        {
          id: 'charcuterie-large',
          label: 'Large Charcuterie Tray',
          description: 'Traditional tray with assorted meats, cheeses, fruit & veggies — or sweet & salty with fruit and assorted sweets.',
          pricingType: 'flat',
          price: 75,
          variants: [
            { id: 'traditional', label: 'Traditional (meats, cheeses, fruit, veggies)', price: 75 },
            { id: 'sweet-salty',  label: 'Sweet & Salty (fruit, assorted sweets)',       price: 75 }
          ]
        },
        {
          id: 'charcuterie-small',
          label: 'Small Charcuterie Tray',
          description: 'Traditional tray with assorted meats, cheeses, fruit & veggies — or sweet & salty with fruit and assorted sweets.',
          pricingType: 'flat',
          price: 50,
          variants: [
            { id: 'traditional', label: 'Traditional (meats, cheeses, fruit, veggies)', price: 50 },
            { id: 'sweet-salty',  label: 'Sweet & Salty (fruit, assorted sweets)',       price: 50 }
          ]
        },
        // ── Individual Trays ───────────────────────────────────────────────
        {
          id: 'fruit-tray',
          label: 'Fruit Tray',
          description: '4 lbs fresh fruit assortment with dip and accompaniment.',
          pricingType: 'flat',
          price: 75
        },
        {
          id: 'veggie-tray',
          label: 'Veggie Tray',
          description: '4 lbs fresh vegetable assortment with dips and accompaniment.',
          pricingType: 'flat',
          price: 75
        },
        // ── Beverages ──────────────────────────────────────────────────────
        {
          id: 'cold-pressed-juice',
          label: 'Organic Cold Pressed Juice',
          description: '16 oz bottle per person.',
          pricingType: 'perHead',
          price: 10
        },
        {
          id: 'smoothie-bar',
          label: 'Smoothie Bar',
          description: 'One smoothie per person — barista included.',
          pricingType: 'perHead',
          price: 14
        },
        // ── Salads ─────────────────────────────────────────────────────────
        {
          id: 'salad-mediterranean',
          label: 'Mediterranean Salad',
          description: 'Mixed greens, Kalamata olives, feta, tomato, cucumber, Greek dressing.',
          pricingType: 'perHead',
          price: 18
        },
        {
          id: 'salad-aura',
          label: 'Aura Salad',
          description: 'Mixed greens, pom seeds, carrot, bell pepper, cucumber, blueberry, grape, lemon dressing.',
          pricingType: 'perHead',
          price: 18
        },
        {
          id: 'salad-strawberry-sunshine',
          label: 'Strawberry Sunshine Salad',
          description: 'Romaine, strawberry, goat cheese, pecans, balsamic dressing.',
          pricingType: 'perHead',
          price: 18
        },
        {
          id: 'salad-chicken-mediterranean',
          label: 'Add Chicken — Mediterranean',
          description: '+$2/person grilled chicken on your Mediterranean Salad.',
          pricingType: 'perHead',
          price: 2,
          parentOptionIds: ['salad-mediterranean']
        },
        {
          id: 'salad-chicken-aura',
          label: 'Add Chicken — Aura',
          description: '+$2/person grilled chicken on your Aura Salad.',
          pricingType: 'perHead',
          price: 2,
          parentOptionIds: ['salad-aura']
        },
        {
          id: 'salad-chicken-sunshine',
          label: 'Add Chicken — Strawberry Sunshine',
          description: '+$2/person grilled chicken on your Strawberry Sunshine Salad.',
          pricingType: 'perHead',
          price: 2,
          parentOptionIds: ['salad-strawberry-sunshine']
        },
        // ── Protein Bites ──────────────────────────────────────────────────
        {
          id: 'protein-bites-pb',
          label: 'Protein Bites – Peanut Butter',
          description: 'Pack of 3 bites.',
          pricingType: 'perItem',
          price: 5,
          allowQuantity: true,
          maxQuantity: 20
        },
        {
          id: 'protein-bites-choc',
          label: 'Protein Bites – Chocolate',
          description: 'Pack of 3 bites.',
          pricingType: 'perItem',
          price: 5,
          allowQuantity: true,
          maxQuantity: 20
        }
      ]
    }

  ]);

  readonly vendors = this._vendors.asReadonly();

  getVendorById(id: string) {
    return this._vendors().find(v => v.id === id) ?? null;
  }
}
