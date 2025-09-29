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
    NavigationComponent,
    HeroComponent,
    PillarsComponent,
    ExperiencesComponent,
    SpaceComponent,
    HowComponent,
    FooterComponent,
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
    'assets/gallery/2.jpg',
    'assets/gallery/10.jpg',
    'assets/gallery/14.jpg',
    'assets/gallery/26.jpg',
    'assets/gallery/27.jpg',
    'assets/gallery/31.jpg',
    'assets/gallery/34.jpg',
    'assets/gallery/37.jpg',
    'assets/gallery/39.jpg',
    'assets/gallery/46.jpg',
    'assets/gallery/51.jpg',
    'assets/gallery/52.jpg',
    'assets/gallery/53.jpg',
    'assets/gallery/54.jpg',
    'assets/gallery/55.jpg',
    'assets/gallery/56.jpg',
    'assets/gallery/62.jpg',
    'assets/gallery/63.jpg',
    'assets/gallery/64.jpg',
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
