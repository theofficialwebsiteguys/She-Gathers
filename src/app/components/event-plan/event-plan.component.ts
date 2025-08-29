import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { HowComponent } from '../how/how.component';
import { ExperiencesComponent } from '../experiences/experiences.component';
import { EventWizardComponent } from '../event-wizard/event-wizard.component';

@Component({
  selector: 'app-event-plan',
  imports: [HeroComponent, HowComponent, ExperiencesComponent, EventWizardComponent],
  templateUrl: './event-plan.component.html',
  styleUrl: './event-plan.component.scss'
})
export class EventPlanComponent {

}
