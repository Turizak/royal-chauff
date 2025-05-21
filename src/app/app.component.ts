import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import { gallery } from './data/gallery';
import { fleet } from './data/fleet';
import { testimonials } from './data/testimonials';
import { services } from './data/services';

import { GalleryComponent } from './components/gallery/gallery.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { VideoComponent } from './components/video/video.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FleetComponent } from './components/fleet/fleet.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ContactComponent,
    GalleryComponent,
    FooterComponent,
    VideoComponent,
    TestimonialsComponent,
    FleetComponent,
    AboutComponent,
    ServicesComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'royal-chauff';

  scrolled = signal(false);
  mobileMenuOpen = signal(false);

  videoUrl = 'assets/video/tiktok1.mp4';

  services = signal(services);
  fleet = signal(fleet);
  testimonials = signal(testimonials);
  galleryPhotos = signal(gallery);

  constructor() {
    // Set up scroll event listener if in browser
    effect(() => {
      window.addEventListener('scroll', this.handleScroll.bind(this));

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
      };
    });
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.scrolled.set(true);
    } else {
      this.scrolled.set(false);
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((state) => !state);
  }

  scrollTo(elementId: string, event: Event) {
    event.preventDefault();
    this.mobileMenuOpen.set(false);

    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
