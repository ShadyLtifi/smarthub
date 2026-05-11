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

  try {

    this.isLoading = true;

    // CLOUDINARY DATA
    const data = new FormData();

    data.append('file', this.selectedFile);

    data.append(
      'upload_preset',
      'smart_hub_uploads'
    );

    // UPLOAD TO CLOUDINARY
    const response: any = await this.http.post(

      'https://api.cloudinary.com/v1_1/dvctx5k8z/auto/upload',

      data

    ).toPromise();

    // SAVE FILE URL
    this.formData.file_url = response.secure_url;

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

    // CLEAR FILE
    this.selectedFile = undefined as any;

    // RESET FILE INPUT
    this.fileInput.nativeElement.value = '';

    // HIDE SUCCESS AFTER 4s
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





    




  
   