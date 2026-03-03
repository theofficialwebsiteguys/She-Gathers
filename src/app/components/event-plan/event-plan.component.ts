import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { HowComponent } from '../how/how.component';
import { ExperiencesComponent } from '../experiences/experiences.component';
import { EventWizardComponent } from '../event-wizard/event-wizard.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-event-plan',
  imports: [HeroComponent, HowComponent, EventWizardComponent],
  templateUrl: './event-plan.component.html',
  styleUrl: './event-plan.component.scss'
})
export class EventPlanComponent {
  squareAppId      = environment.square.appId;
  squareLocationId = environment.square.locationId;
  backendUrl       = environment.backendUrl;
}
