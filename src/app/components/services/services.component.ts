import { Component, Input, signal, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  @Input() services = signal<
    { title: string; description: string; url: string }[]
  >([]);
  @Output() scrollToEvent = new EventEmitter<any>();

  onScrollTo(target: string, event: Event) {
    this.scrollToEvent.emit({ target, event });
  }
}
