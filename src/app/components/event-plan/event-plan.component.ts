import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { HowComponent } from '../how/how.component';
import { ExperiencesComponent } from '../experiences/experiences.component';

@Component({
  selector: 'app-event-plan',
  imports: [HeroComponent, HowComponent, ExperiencesComponent],
  templateUrl: './event-plan.component.html',
  styleUrl: './event-plan.component.scss'
})
export class EventPlanComponent {

}
