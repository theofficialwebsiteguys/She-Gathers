import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { EventWizardComponent } from '../event-wizard/event-wizard.component';

@Component({
  selector: 'app-paint-night',
  imports: [HeroComponent, EventWizardComponent],
  templateUrl: './paint-night.component.html',
  styleUrl: './paint-night.component.scss'
})
export class PaintNightComponent {

}
