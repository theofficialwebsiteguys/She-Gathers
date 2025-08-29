import { Component } from '@angular/core';
import { ExperiencesComponent } from '../experiences/experiences.component';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'app-experiences-page',
  imports: [ExperiencesComponent, HeroComponent],
  templateUrl: './experiences-page.component.html',
  styleUrl: './experiences-page.component.scss'
})
export class ExperiencesPageComponent {

}
