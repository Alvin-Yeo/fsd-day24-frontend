import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  form: FormGroup;
  @ViewChild('imgFileInput') imgFileInput: ElementRef;
  
  fileInfo: any;
  blob: any;

  constructor(
    private fb: FormBuilder,
    private serv: AppService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      imgFile: this.fb.control('', [ Validators.required ]),
      uploader: this.fb.control('', [ Validators.required ]),
      remark: this.fb.control('')
    });
  }

  async onSubmitBtn() {
    const formData = new FormData();
    formData.set('uploader', this.form.get('uploader').value);
    formData.set('remark', this.form.get('remark').value);
    formData.set('file', this.imgFileInput.nativeElement.files[0]);

    const response = await this.serv.uploadImage(formData);
    // console.log('Response: ', response);
    this.fileInfo = response.file[0];
  }

  async onGetBtn() {
    const response = await this.serv.getImage(this.fileInfo.key);
    console.log('Get Image Blob: ', response);
    const unsafeImageUrl = URL.createObjectURL(response);
    this.blob = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
  }
}
