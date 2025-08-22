import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { EventWizardComponent } from '../event-wizard/event-wizard.component';

@Component({
  selector: 'app-flower-making',
  imports: [HeroComponent, EventWizardComponent],
  templateUrl: './flower-making.component.html',
  styleUrl: './flower-making.component.scss'
})
export class FlowerMakingComponent {

}
