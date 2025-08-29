import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type PillarIcon = 'community' | 'craft' | 'curated' | 'women';

export interface PillarItem {
  label: string;
  desc: string;
  icon: PillarIcon;
}

@Component({
  selector: 'app-pillars',
  imports: [CommonModule],
  templateUrl: './pillars.component.html',
  styleUrl: './pillars.component.scss'
})
export class PillarsComponent {
  @Input() items: PillarItem[] = [
    {
      label: 'Community',
      desc: 'Rooted in connection. A place where friends, families, and neighbors come together to create memories.',
      icon: 'community'
    },
    {
      label: 'Women-Led Collective',
      desc: 'A network of women-owned businesses working together to make your event unforgettable.',
      icon: 'women'
    },
    {
      label: 'Crafted Experiences',
      desc: 'Every detail—candles, flowers, or tea—is handcrafted with intention by our artisans.',
      icon: 'craft'
    },
    {
      label: 'Curated Space',
      desc: 'A cozy, modern venue—thoughtfully designed for your celebration.',
      icon: 'curated'
    }
  ];

  // Normalize to full items (so template can use *ngFor="let p of viewItems")
  get viewItems(): PillarItem[] {
    return this.items.map(i => typeof i === 'string' ? this.stringToItem(i) : i);
  }

  private stringToItem(label: string): PillarItem {
    const key = label.toLowerCase();
    switch (key) {
      case 'community':
        return { label: 'Community', desc: 'A space to connect, celebrate, and support one another.', icon: 'community' };
      case 'craft':
        return { label: 'Craft', desc: 'Handmade details and thoughtful touches in everything we do.', icon: 'craft' };
      case 'curated':
        return { label: 'Curated', desc: 'Intentional selections—quality over quantity, always.', icon: 'curated' };
      case 'women':
      case 'women-led':
        return { label: 'Women-Led', desc: 'Built by women, welcoming to all.', icon: 'women' };
      default:
        return { label, desc: 'Thoughtfully made for gatherings that feel like you.', icon: 'curated' };
    }
  }
}
