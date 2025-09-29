import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

export interface SpaceShowcaseItem {
  imageUrl: string;
  label: string;
  desc?: string;
  alt?: string;
}

@Component({
  selector: 'app-space',
  standalone: true, // Assuming this is now a standalone component
  imports: [CommonModule],
  templateUrl: './space.component.html',
  styleUrl: './space.component.scss',
})
export class SpaceComponent {
  // ... (Existing @Input and @ViewChild code remains the same) ...
  @Input() set images(v: string[]) {
    if (!v?.length) return;
    this.items = v.map((src, i) => ({
      imageUrl: src,
      label: this.defaultLabels[i % this.defaultLabels.length],
      alt: `She Gathers interior photo ${i + 1}`
    }));
  }

  @Input() items: SpaceShowcaseItem[] = [];
  @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;

  asGrid = false;
  defaultLabels = [
    'Cozy Nook',
    'Workshop Tables',
    'Market Shelves',
    'Floral Details'
  ];
  
  // ➡️ NEW STATE FOR LIGHTBOX ⬅️
  selectedImage: SpaceShowcaseItem | null = null;
  isModalOpen = false;


  // ➡️ NEW METHODS ⬅️
  openModal(item: SpaceShowcaseItem) {
    this.selectedImage = item;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling of the background
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedImage = null;
    document.body.style.overflow = ''; // Restore background scrolling
  }


  // ... (Existing methods remain the same) ...
  toggleGrid() { this.asGrid = !this.asGrid; }

  scroll(direction: 1 | -1) {
    if (this.asGrid) return;
    const el = this.track.nativeElement;
    const amount = el.clientWidth * 0.9 * direction;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  }

  onKey(e: KeyboardEvent) {
    if (this.asGrid) return;
    if (e.key === 'ArrowRight') { this.scroll(1); e.preventDefault(); }
    if (e.key === 'ArrowLeft')  { this.scroll(-1); e.preventDefault(); }
  }
}