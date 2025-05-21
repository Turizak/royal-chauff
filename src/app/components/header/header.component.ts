import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() scrollToEvent = new EventEmitter<any>();

  onScrollTo(target: string, event: Event) {
    this.scrollToEvent.emit({ target, event });
  }
}
