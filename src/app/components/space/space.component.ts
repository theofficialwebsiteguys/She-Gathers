import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';

export interface SpaceShowcaseItem {
  imageUrl: string;
  label: string;
  desc?: string;
  alt?: string;
}

@Component({
  selector: 'app-space',
  imports: [CommonModule],
  templateUrl: './space.component.html',
  styleUrl: './space.component.scss',
})
export class SpaceComponent {
  /** If you pass just an array of image URLs, we’ll auto-label them. */
  @Input() set images(v: string[]) {
    if (!v?.length) return;
    this.items = v.map((src, i) => ({
      imageUrl: src,
      label: this.defaultLabels[i % this.defaultLabels.length],
      desc: this.defaultDescs[i % this.defaultDescs.length],
      alt: `She Gathers interior photo ${i + 1}`
    }));
  }

  @Input() items: SpaceShowcaseItem[] = [];

  @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;

  asGrid = false;

  defaultLabels = ['Cozy Nook', 'Workshop Tables', 'Market Shelves', 'Floral Details'];
  defaultDescs = [
    'Sit, sip, and stay awhile.',
    'Space to create together.',
    'Handpicked goods—women-led.',
    'Soft, natural textures.'
  ];

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
    if (e.key === 'ArrowLeft')  { this.scroll(-1); e.preventDefault(); }
  }
}
