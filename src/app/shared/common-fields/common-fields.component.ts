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
  uploadingGallery = false;

  constructor(private gp: GpContentService) {}

  // PRIMARY IMAGE
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

  // MULTIPLE IMAGES
  async onGallerySelect(event: any) {
    const files: File[] = Array.from(event.target.files);
    if (!files.length) return;

    this.uploadingGallery = true;
    this.model.images = this.model.images || [];

    try {
      for (const file of files) {
        const url = await this.gp.uploadImage(file);
        this.model.images.push(url);

        // auto set primary image if missing
        if (!this.model.image) {
          this.model.image = url;
        }
      }
    } finally {
      this.uploadingGallery = false;
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

  removeGalleryImage(i: number) {
    this.model.images.splice(i, 1);
  }

  removePdf() {
    this.model.pdf = '';
  }
}
