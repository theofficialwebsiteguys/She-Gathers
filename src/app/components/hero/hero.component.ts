import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterModule, CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
readonly imageUrls = [
    'assets/gallery/1.jpg',
    'assets/gallery/2.jpg',
    'assets/gallery/3.jpg',
    'assets/gallery/4.jpg',
    'assets/gallery/5.jpg',
    'assets/gallery/6.jpg',
  ];
  
  // State for the carousel: Tracks which image index is currently active
  currentImageIndex = signal(0);
  
  // Inputs from the original component structure
  @Input() title = 'Gather beautifully.';
  @Input() subtitle = 'Discover the perfect blend of modern design and timeless comfort for your next event.';
  @Input() primaryCta!: {label:string; link:string} ;
  @Input() secondaryCta!: {label:string; link:string} ;

  @Input() variant: 'main' | 'sub' = 'main';
  @Input() showBadge = true;
  @Input() showFade = true; 
  @Input() curveColor = '#f5d8cd';

  // Logic to advance the carousel every 5 seconds
  constructor() {
    if (this.imageUrls.length > 1) {
      setInterval(() => {
        this.currentImageIndex.update(index => 
          (index + 1) % this.imageUrls.length
        );
      }, 5000); // Cycles every 5 seconds
    }
  }
}
