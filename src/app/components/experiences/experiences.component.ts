import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface ExperienceCard {
  id: string;
  title: string;
  link: string;
  imageUrl: string;
  category: string;
  vendor?: string;
  pricePerHead?: number;
  minGuests?: number;
  durationMinutes?: number;
}


@Component({
  selector: 'app-experiences',
  imports: [CommonModule, RouterModule],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss'
})
export class ExperiencesComponent {
  experiences = [
    { title: 'Paint Night', desc: 'Sip wine and create a masterpiece.', imageUrl: 'assets/store1.jpeg' },
    { title: 'Candle Making', desc: 'Blend scents, pour, and personalize.', imageUrl: 'assets/store2.jpeg' },
    { title: 'Flower Workshop', desc: 'Design floral arrangements to take home.', imageUrl: 'assets/store3.jpeg' },
    { title: 'Luncheon', desc: 'Curate special dishes for a luncheon/gathering.', imageUrl: 'assets/store3.jpeg' },
    { title: 'Tea Nights', desc: 'Taste and pair seasonal teas.', imageUrl: 'assets/store2.jpeg' },
    { title: 'Sip, Shop & Support', desc: 'Local vendors meet community night.', imageUrl: 'assets/store1.jpeg' }
  ];

}
