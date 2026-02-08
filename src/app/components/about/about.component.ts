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
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  ownerData: Owner = {
    name: 'Megan Forness',
    title: 'Owner, She Gathers',
    bio: `
I started my business journey in 2019 with one clear intention: to create spaces where women feel supported, safe, and confident showing up as themselves.

Over the years, as I built and operated multiple businesses across wellness, events, and women-centered collectives, one thing became very clear—women were craving spaces that felt real. Not competitive. Not performative. Just rooted in connection, trust, and community.

She Gathers is my third women-centered collective, and with each space I create, I’m constantly reminded why places built by women, for women matter so deeply. These environments allow women to feel heard, respected, and safe enough to take risks, share ideas, and grow—both personally and professionally.

What I’ve learned is that the women who thrive in these collectives show up. They’re willing to have the tough conversations, keep trying when things are hard, and work as a team instead of in silos. They take ownership of their businesses, their roles, and the community they’re helping to build.

She Gathers is more than a place to shop—it’s a space where women-owned businesses are present, engaged, and building alongside one another.

I created She Gathers because I believe women deserve environments where they don’t have to shrink to succeed—and where community matters just as much as commerce.
    `.trim(),
    imageUrl: 'assets/gallery/12.jpg',
  };

  get bioParagraphs(): string[] {
    return this.ownerData.bio.split('\n\n');
  }
}
