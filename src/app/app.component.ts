import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'royal-chauff';

  scrolled = signal(false);
  mobileMenuOpen = signal(false);
  currentSlide = signal(0);

  // Lightbox states
  lightboxActive = signal(false);
  currentLightboxIndex = signal(0);

  // Form data
  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  };

  // Newsletter data
  newsletter = {
    email: '',
  };

  services = signal([
    {
      title: 'Airport Transfers',
      description:
        'Start or end your journey with our reliable airport transfer service. Our chauffeurs monitor flight status to ensure timely pickups and drop-offs.',
    },
    {
      title: 'Corporate Travel',
      description:
        'Make a lasting impression with our executive transportation solutions. Perfect for business meetings, conferences, and corporate events.',
    },
    {
      title: 'Wedding Transportation',
      description:
        'Arrive in style on your special day. Our luxury vehicles and professional chauffeurs add elegance to your wedding transportation.',
    },
    {
      title: 'Special Events',
      description:
        "Whether it's a concert, sports event, or gala dinner, our chauffeurs ensure you arrive relaxed and on time for your special occasion.",
    },
    {
      title: 'Hourly Charters',
      description:
        'Hire our chauffeur service by the hour for shopping trips, city tours, or multiple stops, with a dedicated driver at your disposal.',
    },
    {
      title: 'VIP Services',
      description:
        'Experience the highest level of luxury and discretion with our premium VIP chauffeur services, tailored to your specific requirements.',
    },
  ]);

  fleet = signal([
    {
      name: 'Mercedes-Benz S-Class',
      capacity: 3,
      luggage: 2,
      price: 120,
      description:
        'The Mercedes-Benz S-Class represents the pinnacle of luxury sedans, offering exceptional comfort and state-of-the-art technology for discerning clients.',
    },
    {
      name: 'BMW 7 Series',
      capacity: 3,
      luggage: 2,
      price: 110,
      description:
        'The BMW 7 Series combines athletic performance with sophisticated luxury, providing a dynamic and comfortable ride for business or leisure.',
    },
    {
      name: 'Cadillac Escalade',
      capacity: 6,
      luggage: 4,
      price: 150,
      description:
        'The Cadillac Escalade offers spacious luxury with imposing presence. Perfect for groups requiring maximum comfort and luggage capacity.',
    },
    {
      name: 'Mercedes-Benz V-Class',
      capacity: 7,
      luggage: 5,
      price: 140,
      description:
        'The Mercedes-Benz V-Class provides first-class comfort for larger groups, with versatile seating and ample space for passengers and luggage.',
    },
  ]);

  testimonials = signal([
    {
      text: 'Elite Chauffeur Service provided exceptional service for our corporate event. The chauffeurs were professional, punctual, and courteous. Highly recommended for business transportation needs.',
      name: 'Michael Thompson',
      position: 'CEO, Thompson Enterprises',
      rating: 5,
    },
    {
      text: 'We used Elite Chauffeur for our wedding day, and everything was perfect! The vehicles were immaculate, and our chauffeur went above and beyond to make our special day stress-free.',
      name: 'Sarah Johnson',
      position: 'Wedding Client',
      rating: 5,
    },
    {
      text: 'As a frequent business traveler, I rely on Elite Chauffeur for all my airport transfers. Their reliability and consistent service quality make them my go-to transportation provider.',
      name: 'David Chen',
      position: 'International Sales Director',
      rating: 4,
    },
  ]);

  galleryPhotos = signal([
    {
      id: 1,
      url: 'assets/slideshow/img1.jpg',
      title: 'Mercedes S-Class Interior',
      description: 'Luxurious leather seating and premium amenities',
    },
    {
      id: 2,
      url: 'assets/slideshow/img2.jpg',
      title: 'Airport Transfer Service',
      description: 'Professional chauffeur waiting at the terminal',
    },
    {
      id: 3,
      url: 'assets/slideshow/img3.jpg',
      title: 'Corporate Event Transportation',
      description: 'Executive service for business professionals',
    },
    {
      id: 4,
      url: 'assets/slideshow/img4.jpg',
      title: 'Wedding Day Transportation',
      description: 'Elegantly decorated luxury vehicle for special occasions',
    },
    {
      id: 5,
      url: 'assets/slideshow/img5.jpg',
      title: 'Cadillac Escalade',
      description: 'Spacious SUV with premium features',
    },
    {
      id: 6,
      url: 'assets/slideshow/img6.jpg',
      title: 'Chauffeur Service',
      description: 'Professional uniformed driver providing excellent service',
    },
  ]);

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

  // Handle scroll events
  handleScroll() {
    if (window.scrollY > 50) {
      this.scrolled.set(true);
    } else {
      this.scrolled.set(false);
    }
  }

  // Toggle mobile menu
  toggleMobileMenu() {
    this.mobileMenuOpen.update((state) => !state);
  }

  // Smooth scroll to element
  scrollTo(elementId: string, event: Event) {
    event.preventDefault();
    this.mobileMenuOpen.set(false);

    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Fleet navigation
  nextSlide() {
    this.currentSlide.update(
      (currentValue) => (currentValue + 1) % this.fleet().length
    );
  }

  prevSlide() {
    this.currentSlide.update(
      (currentValue) =>
        (currentValue - 1 + this.fleet().length) % this.fleet().length
    );
  }

  // Form submission
  submitForm(event: Event) {
    event.preventDefault();
    console.log('Form submitted:', this.formData);
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    this.formData = {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    };
  }

  currentLightboxId: number | null = null;

  openLightbox(id: number): void {
    this.currentLightboxId = id;
  }

  closeLightbox(): void {
    this.currentLightboxId = null;
  }
}
