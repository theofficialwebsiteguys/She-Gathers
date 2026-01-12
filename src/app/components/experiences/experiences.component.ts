import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VendorService } from '../../vendor.service';

interface ExperienceVM {
  vendorId: string;
  title: string;
  desc: string;
  imageUrl: string;
}

@Component({
  selector: 'app-experiences',
  imports: [CommonModule, RouterModule],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss'
})
export class ExperiencesComponent {
  private vendorService = inject(VendorService);

  /** Derived experiences (single source of truth) */
  experiences = computed(() =>
    this.vendorService.vendors().map(vendor => ({
      vendorId: vendor.id,
      title: vendor.name,
      desc: vendor.blurb,
      imageUrl: vendor.banner || vendor.logo
    }))
  );

}
