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
    { 
      title: 'Noir Candles', 
      desc: 'Learn how to craft your own custom soy candles from start to finish.', 
      imageUrl: 'assets/vendors/noir-candles.jpg' 
    },
    { 
      title: 'Cup of Communitea', 
      desc: 'Step into the delicious world of tea with a guided, one-hour tasting experience hosted by Cup of Communitea.', 
      imageUrl: 'assets/vendors/communitea.jpg' 
    },
    { 
      title: 'Emotional Support Peens – Handmade Event Favors', 
      desc: 'Looking for an unforgettable party favor or conversation starter?', 
      imageUrl: 'assets/vendors/emotional-support-peens.jpg' 
    },
    { 
      title: 'Green Room Linens Workshops', 
      desc: 'Lean into a zero waste lifestyle by creating new items from reclaimed and repurposed linens! ', 
      imageUrl: 'assets/vendors/green-room-linens.jpg' 
    },
  ];

}
