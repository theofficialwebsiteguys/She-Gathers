import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface Owner {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  // Input property to pass the owner's data from the parent component
  ownerData: Owner = {
    name: 'Megan Forness',
    title: 'Owner, She Gathers',
    bio: 'Megan is a self made entrepreneur...',
    imageUrl: 'assets/gallery/12.jpg', // Replace with a real image path
  };

  constructor() { }

  ngOnInit(): void {
    // Basic validation to ensure data is passed
    if (!this.ownerData) {
      console.error('Owner data is required for OwnerBioComponent.');
    }
  }

  // Method to navigate to an external URL (e.g., LinkedIn)
  goToUrl(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
