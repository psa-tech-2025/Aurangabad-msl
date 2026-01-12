import { Component, Input } from '@angular/core';
import { GpContentService } from 'src/app/services/gp-content.service';

@Component({
  selector: 'app-common-fields',
  templateUrl: './common-fields.component.html',
  styleUrls: ['./common-fields.component.css']
})
export class CommonFieldsComponent {

  @Input() model: any;

  uploadingImage = false;
  uploadingPdf = false;

  constructor(private gp: GpContentService) {}

  async onImageSelect(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.uploadingImage = true;
    try {
      const url = await this.gp.uploadImage(file);
      this.model.image = url;
    } finally {
      this.uploadingImage = false;
    }
  }

  async onPdfSelect(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.uploadingPdf = true;
    try {
      const url = await this.gp.uploadImage(file);
      this.model.pdf = url;
    } finally {
      this.uploadingPdf = false;
    }
  }

  removeImage() {
    this.model.image = '';
  }

  removePdf() {
    this.model.pdf = '';
  }
}
