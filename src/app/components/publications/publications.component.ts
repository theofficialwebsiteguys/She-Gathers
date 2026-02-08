import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Publication {
  title: string;
  source: string;
  url: string;
}

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss',
})
export class PublicationsComponent {

  publications: Publication[] = [
    {
      title: 'Harnessing the Power of Women-Owned Collectives',
      source: 'Buffalo.com',
      url: 'https://buffalo.com/community/harnessing-the-power-of-women-owned-collectives/article_f9055840-a058-4d50-b09e-21f11bf8272d.html',
    },
    {
      title: 'This New Woman-Owned Collective Is Like the “Girl Math” of Shops',
      source: 'Step Out Buffalo',
      url: 'https://stepoutbuffalo.com/this-new-woman-owned-collective-is-like-the-girl-math-of-shops/',
    },
    {
      title: 'Megan Forness: Building Communities of Women Entrepreneurs',
      source: 'The Home Publications',
      url: 'https://www.thehomepublications.com/post/megan-forness-building-communities-of-women-entrepreneurs',
    },
  ];

  openPublication(url: string): void {
    window.open(url, '_blank');
  }
}
