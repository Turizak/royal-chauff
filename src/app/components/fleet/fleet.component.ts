import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.scss',
})
export class FleetComponent {
  @Input() fleet = signal<
    {
      name: string;
      description: string;
      capacity: number;
      luggage: number;
      price: number;
    }[]
  >([]);
  currentSlide = signal(0);

  private touchStartX = 0;
  private touchEndX = 0;
  private readonly swipeThreshold = 50;
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

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) < this.swipeThreshold) return;

    if (diff > 0) {
      this.nextSlide();
    } else {
      this.prevSlide();
    }
  }
}
