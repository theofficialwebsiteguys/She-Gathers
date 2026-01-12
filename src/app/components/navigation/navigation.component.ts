import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, HostListener, Renderer2, signal, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  isMobileMenuOpen = false;
  scrolled = false;

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 8;
  }

  openMenu() {
    this.isMobileMenuOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}
