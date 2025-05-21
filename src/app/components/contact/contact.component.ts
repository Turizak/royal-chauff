import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  };
  isSubmitting = false;

  constructor(private http: HttpClient) {}

  submitForm(event: Event) {
    event.preventDefault();
    this.isSubmitting = true;

    const serverUrl = environment.SERVER_URL || '';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http
      .post(`${serverUrl}/send-email`, this.formData, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error sending email:', error);
          alert(
            'Sorry, there was an error sending your message. Please try again later.'
          );
          this.isSubmitting = false;
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          console.log('Form submitted successfully:', response);
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
        this.isSubmitting = false;
      });
  }
}
