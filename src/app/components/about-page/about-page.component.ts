import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-about-page',
  imports: [HeroComponent, AboutComponent, BannerComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent {

}
