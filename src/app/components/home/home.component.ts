import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { HeroComponent } from '../hero/hero.component';
import { PillarsComponent } from '../pillars/pillars.component';
import { ExperiencesComponent } from '../experiences/experiences.component';
import { SpaceComponent } from '../space/space.component';
import { HowComponent } from '../how/how.component';
import { FooterComponent } from '../footer/footer.component';
import { BannerComponent } from '../banner/banner.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    PillarsComponent,
    ExperiencesComponent,
    SpaceComponent,
    BannerComponent,
    AboutComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  featured = [
    {
      id: 'tea',
      title: 'Tea Tasting',
      vendor: 'Cup of Communitea',
      category: 'Tea',
      pricePerHead: 30,
      minGuests: 6,
      durationMinutes: 60,
      imageUrl: 'assets/usable-images/web/IMG_6043.jpg',
      link: '/experiences/tea-tasting',
    },
    {
      id: 'candle',
      title: 'Candle Workshop',
      vendor: 'Noir Flames',
      category: 'Candle',
      pricePerHead: 35,
      imageUrl: 'assets/usable-images/web/IMG_6033.jpg',
      link: '/experiences/candle-workshop',
    },
    {
      id: 'dessert',
      title: 'Dessert Social',
      vendor: 'Quokka Sweets',
      category: 'Dessert',
      pricePerHead: 12,
      imageUrl: 'assets/usable-images/web/IMG_6035.jpg',
      link: '/experiences/dessert-social',
    },
  ];

  spaceImgs = [
    'assets/usable-images/web/6M5A1793.jpg',
    'assets/usable-images/web/6M5A1786.jpg',
    'assets/usable-images/web/6M5A1775.jpg',
    'assets/usable-images/web/6M5A1782.jpg',
    'assets/usable-images/web/6M5A1767.jpg',
    'assets/usable-images/web/6M5A1763.jpg',
    'assets/usable-images/web/6M5A1766.jpg',
    'assets/usable-images/web/6M5A1759.jpg',
    'assets/usable-images/web/6M5A1770.jpg',
    'assets/usable-images/web/6M5A1771.jpg',
    'assets/usable-images/web/6M5A1783.jpg',
    'assets/usable-images/web/6M5A1764.jpg',
    'assets/usable-images/web/IMG_6046.jpg',
    'assets/usable-images/web/IMG_6018.jpg',
    'assets/usable-images/web/IMG_6022.jpg',
    'assets/usable-images/web/IMG_6019.jpg',
    'assets/usable-images/web/IMG_6031.jpg',
    'assets/usable-images/web/IMG_6017.jpg',
    'assets/usable-images/web/IMG_6027.jpg',
    'assets/usable-images/web/IMG_6026.jpg',
    'assets/usable-images/web/IMG_6021.jpg',
    'assets/usable-images/web/IMG_6025.jpg',
    'assets/usable-images/web/IMG_6020.jpg',
    'assets/usable-images/web/IMG_6024.jpg',
    'assets/usable-images/web/IMG_6028.jpg',
    'assets/usable-images/web/IMG_6029.jpg',
    'assets/usable-images/web/IMG_6030.jpg',
    'assets/usable-images/web/IMG_6033.jpg',
    'assets/usable-images/web/IMG_6034.jpg',
    'assets/usable-images/web/IMG_6035.jpg',
    'assets/usable-images/web/IMG_6037.jpg',
    'assets/usable-images/web/IMG_6038.jpg',
    'assets/usable-images/web/IMG_6039.jpg',
    'assets/usable-images/web/IMG_6040.jpg',
    'assets/usable-images/web/IMG_6041.jpg',
    'assets/usable-images/web/IMG_6043.jpg',
    'assets/usable-images/web/IMG_6045.jpg',
    'assets/usable-images/web/IMG_6023.jpg',
    'assets/usable-images/web/IMG_6042.jpg',
  ];

  brandLogos = [
    'assets/logo.png',
    'assets/logo_with_text.png',
    'assets/logo.png',
    'assets/logo_with_text.png',
  ];

  quotes = [
    {
      quote: 'The perfect spot for our bridal party—beautiful and effortless.',
      name: 'Elena R.',
    },
    {
      quote: 'We loved the tea class and the team handled every detail.',
      name: 'Maya G.',
    },
    { quote: 'Crafted, cozy, and so friendly—we’ll be back.', name: 'Tara P.' },
  ];
}
