import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
})
export class VideoComponent {
  @Input() url = '';
  @Output() scrollToEvent = new EventEmitter<any>();

  onScrollTo(target: string, event: Event) {
    this.scrollToEvent.emit({ target, event });
  }
}
