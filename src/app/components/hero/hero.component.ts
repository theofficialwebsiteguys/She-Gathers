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
  @Input() variant: 'main' | 'sub' = 'main';
  @Input() title = 'She Gathers';
  @Input() subtitle = 'A collective of women-owned businesses, creating experiences and connection.';
  @Input() showBadge = true;
  @Input() showFade = true;

  @Input() primaryCta?: { label: string; link: string };
  @Input() secondaryCta?: { label: string; link: string };

  @Input() imageUrls: string[] = [];

  // You already use a signal in template: currentImageIndex()
  private _current = signal(0);
  currentImageIndex = this._current;

  // If you already handle timing elsewhere, keep it.
  // Otherwise, here’s a simple rotating carousel:
  private intervalId?: number;

  ngOnInit() {
    if (this.imageUrls?.length > 1) {
      this.intervalId = window.setInterval(() => {
        const next = (this._current() + 1) % this.imageUrls.length;
        this._current.set(next);
      }, 6500);
    }
  }

  ngOnDestroy() {
    if (this.intervalId) window.clearInterval(this.intervalId);
  }
}
