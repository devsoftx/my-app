import { Component, OnInit } from '@angular/core';
import { ImportService } from '../import.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.sass']
})

export class UploaderComponent implements OnInit {

  error: string;
  
  uploadResponse = { status: '', message: '', filePath: '' };

  constructor(private importService : ImportService){

  }

  ngOnInit() {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      this.importService.upload(formData).subscribe(
        (res) => this.uploadResponse = res,
        (err) => this.error = err
      );
    }
  }
}