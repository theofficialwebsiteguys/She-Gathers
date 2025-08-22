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
 @Input() experiences: ExperienceCard[] = [
    {
      id: 'tea',
      title: 'Tea Tasting',
      vendor: 'Cup of Communitea',
      category: 'Tea',
      pricePerHead: 30,
      minGuests: 6,
      durationMinutes: 60,
      imageUrl: 'assets/store1.jpeg',
      link: '/experiences/tea-tasting',
    },
    {
      id: 'candle',
      title: 'Candle Workshop',
      vendor: 'Noir Flames',
      category: 'Candle',
      pricePerHead: 35,
      imageUrl: 'assets/store2.jpeg',
      link: '/experiences/candle-workshop',
    },
    {
      id: 'dessert',
      title: 'Dessert Social',
      vendor: 'Quokka Sweets',
      category: 'Dessert',
      pricePerHead: 12,
      imageUrl: 'assets/store3.jpeg',
      link: '/experiences/dessert-social',
    },
  ];
  @Output() addToPlan = new EventEmitter<ExperienceCard>();
}
