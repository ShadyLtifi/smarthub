import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss'
})

export class ContactSectionComponent {

  isLoading = false;

  showSuccess = false;

  showError = false;

  errorMessage = '';

  formData = {

    from_name: '',

    from_email: '',

    message: ''

  };

  // EMAIL VALIDATION
  isValidEmail(email: string): boolean {

    const regex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    return regex.test(email);

  }

  async sendMessage() {

    // REMOVE SPACES
    this.formData.from_name =
      this.formData.from_name.trim();

    this.formData.from_email =
      this.formData.from_email.trim();

    this.formData.message =
      this.formData.message.trim();

    // VALIDATION

    if (
      !this.formData.from_name ||
      !this.formData.from_email ||
      !this.formData.message
    ) {

      this.showFormError(
        'Please fill all fields.'
      );

      return;

    }

    // NAME LENGTH
    if (this.formData.from_name.length < 3) {

      this.showFormError(
        'Name must contain at least 3 characters.'
      );

      return;

    }

    // VALID EMAIL
    if (
      !this.isValidEmail(
        this.formData.from_email
      )
    ) {

      this.showFormError(
        'Please enter a valid email address.'
      );

      return;

    }

    // MESSAGE LENGTH
    if (this.formData.message.length < 10) {

      this.showFormError(
        'Message is too short.'
      );

      return;

    }

    try {

      this.isLoading = true;

      await emailjs.send(

        'service_wmpmuhg',

        'template_qkbv0gf',

        this.formData,

        'AWlf6ADPjxxyB1ag0'

      );

      this.showSuccess = true;

      this.showError = false;

      // RESET FORM
      this.formData = {

        from_name: '',

        from_email: '',

        message: ''

      };

      setTimeout(() => {

        this.showSuccess = false;

      }, 4000);

    }

    catch(error) {

      console.error(error);

      this.showFormError(
        'Message failed. Please try again.'
      );

    }

    finally {

      this.isLoading = false;

    }

  }

  showFormError(message: string) {

    this.errorMessage = message;

    this.showError = true;

    setTimeout(() => {

      this.showError = false;

    }, 4000);

  }

}