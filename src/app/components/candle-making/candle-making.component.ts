import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { EventWizardComponent } from '../event-wizard/event-wizard.component';

@Component({
  selector: 'app-candle-making',
  imports: [HeroComponent, EventWizardComponent],
  templateUrl: './candle-making.component.html',
  styleUrl: './candle-making.component.scss'
})
export class CandleMakingComponent {

}
