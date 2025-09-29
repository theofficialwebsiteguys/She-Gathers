import { Component } from '@angular/core';
import { ExperiencesComponent } from '../experiences/experiences.component';
import { HeroComponent } from '../hero/hero.component';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-experiences-page',
  imports: [ExperiencesComponent, HeroComponent, BannerComponent],
  templateUrl: './experiences-page.component.html',
  styleUrl: './experiences-page.component.scss'
})
export class ExperiencesPageComponent {

}
