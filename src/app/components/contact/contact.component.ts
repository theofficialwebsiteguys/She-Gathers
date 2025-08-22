import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [HeroComponent, CommonModule, FormsModule, GoogleMapsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  name = '';
  email = '';
  phone = '';
  message = '';

  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild('mapWrapper', { static: false }) mapWrapper!: ElementRef;

  latitude = 42.8869; // Replace with actual latitude
  longitude = -78.8789; // Replace with actual longitude
  zoom = 14;

  ngAfterViewInit() {
    this.triggerMapResize();
  }

  @HostListener('window:resize')
  triggerMapResize() {
    setTimeout(() => {
      if (this.map) {
        this.map.googleMap?.setCenter({ lat: this.latitude, lng: this.longitude });
      }

      // ✅ Ensure mapWrapper is defined before modifying its styles
      if (this.mapWrapper && this.mapWrapper.nativeElement) {
        if (window.innerWidth <= 1024) {
          this.mapWrapper.nativeElement.style.position = 'relative';
          this.mapWrapper.nativeElement.style.marginTop = '200px';
        } else {
          this.mapWrapper.nativeElement.style.position = 'static';
          this.mapWrapper.nativeElement.style.marginTop = '0';
        }
      }
    }, 300);
  }

  onSubmit() {
    // Send this data somewhere or use FormBuilder if preferred
    alert('Message sent!');
  }
}
