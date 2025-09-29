import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-banner',
  imports: [CommonModule, RouterModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  /** Background image path */
  @Input() background = 'assets/gallery/1.jpg';

  /** Headline */
  @Input() title = 'UNLOCK MORE. SPEND LESS. SAVE BIG!';

  /** Subtitle */
  @Input() subtitle = `Get the most value with our everyday discounts! From seniors and veterans to first responders,
  we offer special savings to show our appreciation. Plus, don’t miss out on amazing rewards and referral perks. 
  Check back often—new deals and exclusive offers are always around the corner!`;

  /** CTA Button */
  @Input() buttonText = 'EXPLORE MORE';
  @Input() buttonLink = '#';
}
