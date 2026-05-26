import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../hero/hero.component';
import { BannerComponent } from '../banner/banner.component';

interface Event {
  name: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  ticketInfo: string;
  description: string;
  registerUrl: string;
  imageUrl: string;
}

@Component({
  selector: 'app-events-page',
  imports: [CommonModule, RouterModule, HeroComponent, BannerComponent],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.scss'
})
export class EventsPageComponent {
  events: Event[] = [
    {
      name: 'Taste Your Way Through She Gathers',
      subtitle: 'An Evening of Sips, Snacks & Gathering',
      date: 'Saturday, June 6, 2026',
      time: '4:00 – 6:00 PM · Vendors on site until 7 PM',
      location: '38 Webster St., North Tonawanda',
      ticketInfo: '$25 in advance · $30 at the door',
      description: 'Sip, savor & shop your way through She Gathers! Enjoy tastings at 6 stations, meet the makers, shop local & enter to win our giveaway tote filled with goodies from the space. Receive your tasting passport, collect punches at each station, and enter to win raffle prizes.',
      registerUrl: 'https://www.jotform.com/261357672661160',
      imageUrl: 'assets/events/taste-your-way.png'
    }
  ];
}
