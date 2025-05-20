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
}
