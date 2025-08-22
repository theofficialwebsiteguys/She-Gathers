import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterModule, CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @Input() imageUrl = 'assets/hero-placeholder.jpg';
  @Input() title = 'Gather beautifully.';
  @Input() subtitle: any;
  @Input() primaryCta!: {label:string; link:string};
  @Input() secondaryCta!: {label:string; link:string};

  @Input() variant: 'main' | 'sub' = 'main';   // controls style
  @Input() showBadge = true;                   // toggle badge
  @Input() showCurve = true;                   // toggle curve
}
