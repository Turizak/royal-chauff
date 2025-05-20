import { Component, signal, Input } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {
  @Input() testimonials = signal<
    { text: string; name: string; position: string; rating: number }[]
  >([]);
}
