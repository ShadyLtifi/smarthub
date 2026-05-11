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

  formData = {

    from_name: '',

    from_email: '',

    message: ''

  };

  async sendMessage() {

    try {

      this.isLoading = true;

      await emailjs.send(

        'service_wmpmuhg',

        'template_qkbv0gf',

        this.formData,

        'AWlf6ADPjxxyB1ag0'

      );

      this.showSuccess = true;

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

      alert('Message failed.');

    }

    finally {

      this.isLoading = false;

    }

  }

}