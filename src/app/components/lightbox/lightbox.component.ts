import { Component, Input, Signal, signal, effect } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss',
})
export class LightboxComponent {
  lightboxActive = signal(false);
  currentLightboxId = signal(0);
  @Input() galleryPhotos = signal<
    { id: number; url: string; title: string; description: string }[]
  >([]);

  constructor() {
    // Set up keyboard event listener for lightbox navigation
    effect(() => {
      if (this.lightboxActive()) {
        window.addEventListener('keydown', this.handleKeyboardEvent.bind(this));
      }
      return () => {
        window.removeEventListener(
          'keydown',
          this.handleKeyboardEvent.bind(this)
        );
      };
    });
  }

  openLightbox(id: number): void {
    this.currentLightboxId.set(id);
    this.lightboxActive.set(true);
  }

  closeLightbox(): void {
    this.currentLightboxId.set(0);
    this.lightboxActive.set(false);
  }

  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.navigateToPrevious();
        break;
      case 'ArrowRight':
        this.navigateToNext();
        break;
      case 'Escape':
        this.closeLightbox();
        break;
    }
  }

  navigateToPrevious(): void {
    if (!this.currentLightboxId()) return;

    const photos = this.galleryPhotos();
    const currentIndex = photos.findIndex(
      (photo) => photo.id === this.currentLightboxId()
    );

    if (currentIndex > 0) {
      this.currentLightboxId.set(photos[currentIndex - 1].id);
    } else {
      this.currentLightboxId.set(photos[photos.length - 1].id);
    }
  }

  navigateToNext(): void {
    if (!this.currentLightboxId()) return;

    const photos = this.galleryPhotos();
    const currentIndex = photos.findIndex(
      (photo) => photo.id === this.currentLightboxId()
    );

    if (currentIndex < photos.length - 1) {
      this.currentLightboxId.set(photos[currentIndex + 1].id);
    } else {
      this.currentLightboxId.set(photos[0].id);
    }
  }
}
