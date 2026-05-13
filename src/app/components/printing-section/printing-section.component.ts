import {
  Component,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import emailjs from '@emailjs/browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-printing-section',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './printing-section.component.html',
  styleUrl: './printing-section.component.scss'
})

export class PrintingSectionComponent {

  selectedFile!: File;
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  isLoading = false;
  showSuccess = false;

  formData = {
    from_name: '',
    from_email: '',
    print_type: 'Black & White',
    paper_format: 'A4',
    pages: 1,
    file_url: ''
  };

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {

    this.selectedFile = event.target.files[0];

  }
  async sendEmail() {

  // REMOVE SPACES
  this.formData.from_name =
    this.formData.from_name.trim();

  this.formData.from_email =
    this.formData.from_email.trim();

  // VALIDATION

  if (
    !this.formData.from_name ||
    !this.formData.from_email
  ) {

    alert('Please fill all fields.');
    return;

  }

  // VALID NAME
  if (this.formData.from_name.length < 3) {

    alert('Name is too short.');
    return;

  }

  // VALID EMAIL
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (
    !emailRegex.test(
      this.formData.from_email
    )
  ) {

    alert('Invalid email address.');
    return;

  }

  // VALID FILE
  if (!this.selectedFile) {

    alert('Please upload a file.');
    return;

  }

  // FILE SIZE LIMIT (10MB)
  if (
    this.selectedFile.size >
    10 * 1024 * 1024
  ) {

    alert('File too large. Max 10MB.');
    return;

  }

  // ALLOWED FILE TYPES
  const allowedTypes = [

    'application/pdf',

    'image/png',

    'image/jpeg',

    'application/msword',

    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

  ];

  if (
    !allowedTypes.includes(
      this.selectedFile.type
    )
  ) {

    alert(
      'Only PDF, DOCX, JPG, PNG files are allowed.'
    );

    return;

  }

  try {

    this.isLoading = true;

    // CLOUDINARY DATA
    const data = new FormData();

    data.append(
      'file',
      this.selectedFile
    );

    data.append(
      'upload_preset',
      'smart_hub_uploads'
    );

    // UPLOAD
    const response: any =
      await this.http.post(

        'https://api.cloudinary.com/v1_1/dvctx5k8z/auto/upload',

        data

      ).toPromise();

    // FILE URL
    this.formData.file_url =
      response.secure_url;

    // SEND EMAIL
    await emailjs.send(

      'service_wmpmuhg',

      'template_2nq1z6i',

      this.formData,

      'AWlf6ADPjxxyB1ag0'

    );

    // SUCCESS
    this.showSuccess = true;

    // RESET FORM
    this.formData = {

      from_name: '',

      from_email: '',

      print_type: 'Black & White',

      paper_format: 'A4',

      pages: 1,

      file_url: ''

    };

    // RESET FILE
    this.selectedFile =
      undefined as any;

    this.fileInput.nativeElement.value =
      '';

    setTimeout(() => {

      this.showSuccess = false;

    }, 4000);

  }

  catch(error) {

    console.error(error);

    alert('Upload failed.');

  }

  finally {

    this.isLoading = false;

  }

}

 

}





    




  
   