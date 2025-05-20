import { Component, Input, signal, ViewChild } from '@angular/core';
import { LightboxComponent } from '../lightbox/lightbox.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [LightboxComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  @Input() galleryPhotos = signal<
    { id: number; url: string; title: string; description: string }[]
  >([]);

  @ViewChild('galleryLB') galleryLB!: LightboxComponent;
}
