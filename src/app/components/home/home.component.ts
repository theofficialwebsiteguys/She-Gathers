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
      imageUrl: 'assets/store1.jpeg',
      link: '/experiences/tea-tasting',
    },
    {
      id: 'candle',
      title: 'Candle Workshop',
      vendor: 'Noir Flames',
      category: 'Candle',
      pricePerHead: 35,
      imageUrl: 'assets/store2.jpeg',
      link: '/experiences/candle-workshop',
    },
    {
      id: 'dessert',
      title: 'Dessert Social',
      vendor: 'Quokka Sweets',
      category: 'Dessert',
      pricePerHead: 12,
      imageUrl: 'assets/store3.jpeg',
      link: '/experiences/dessert-social',
    },
  ];

  spaceImgs = [
    'assets/new-gallery/web/6M5A1793.jpg',
    'assets/new-gallery/web/6M5A1786.jpg',
    'assets/new-gallery/web/6M5A1775.jpg',
    'assets/new-gallery/web/6M5A1782.jpg',
    'assets/new-gallery/web/6M5A1767.jpg',
    'assets/new-gallery/web/6M5A1763.jpg',
    'assets/new-gallery/web/6M5A1766.jpg',
    'assets/new-gallery/web/6M5A1759.jpg',
    'assets/new-gallery/web/6M5A1770.jpg',
    'assets/new-gallery/web/6M5A1771.jpg',
    'assets/new-gallery/web/6M5A1783.jpg',
    'assets/new-gallery/web/6M5A1764.jpg',
    'assets/new-gallery/web/6M5A1714.jpg',
    'assets/new-gallery/web/6M5A1573.jpg',
    'assets/new-gallery/web/6M5A1653.jpg',
    'assets/new-gallery/web/6M5A1536.jpg',
    'assets/new-gallery/web/6M5A1640.jpg',
    'assets/new-gallery/web/6M5A1755.jpg',
    'assets/new-gallery/web/6M5A1508.jpg',
    'assets/new-gallery/web/6M5A1662.jpg',
    'assets/new-gallery/web/6M5A1549.jpg',
    'assets/new-gallery/web/6M5A1576.jpg',
    'assets/new-gallery/web/6M5A1717.jpg',
    'assets/new-gallery/web/6M5A1609.jpg',
    'assets/new-gallery/web/6M5A1655.jpg',
    'assets/new-gallery/web/6M5A1550.jpg',
    'assets/new-gallery/web/6M5A1703.jpg',
    'assets/new-gallery/web/6M5A1735.jpg',
    'assets/new-gallery/web/6M5A1512.jpg',
    'assets/new-gallery/web/6M5A1649.jpg',
    'assets/new-gallery/web/6M5A1604.jpg',
    'assets/new-gallery/web/6M5A1575.jpg',
    'assets/new-gallery/web/6M5A1713.jpg',
    'assets/new-gallery/web/6M5A1639.jpg',
    'assets/new-gallery/web/6M5A1519.jpg',
    'assets/new-gallery/web/6M5A1659.jpg',
    'assets/new-gallery/web/6M5A1606.jpg',
    'assets/new-gallery/web/6M5A1578.jpg',
    'assets/new-gallery/web/6M5A1719.jpg',
    'assets/new-gallery/web/6M5A1708.jpg',
    'assets/new-gallery/web/6M5A1520.jpg',
    'assets/new-gallery/web/6M5A1660.jpg',
    'assets/new-gallery/web/6M5A1626.jpg',
    'assets/new-gallery/web/6M5A1561.jpg',
    'assets/new-gallery/web/6M5A1748.jpg',
    'assets/new-gallery/web/6M5A1665.jpg',
    'assets/new-gallery/web/6M5A1614.jpg',
    'assets/new-gallery/web/6M5A1579.jpg',
    'assets/new-gallery/web/6M5A1691.jpg',
    'assets/new-gallery/web/6M5A1522.jpg',
    'assets/new-gallery/web/6M5A1670.jpg',
    'assets/new-gallery/web/6M5A1598.jpg',
    'assets/new-gallery/web/6M5A1697.jpg',
    'assets/new-gallery/web/6M5A1540.jpg',
    'assets/new-gallery/web/6M5A1673.jpg',
    'assets/new-gallery/web/6M5A1615.jpg',
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
