import { Component, OnInit } from '@angular/core';
import { GpContentService } from 'src/app/services/gp-content.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  images: any[] = [];

  // admin-only state
  isAdmin = false;
  selectedFile!: File;
  description = '';
  editId: string | null = null;
  selectedImage: any = null;

  // ✅ NEW: social / media link input
  socialLinkInput = '';

  constructor(
    private gp: GpContentService,
    private auth: AuthService
  ) {}

ngOnInit(): void {
  this.gp.getGallery().subscribe(data => {
    this.images = data.map((x: any, i: number) => ({
      id: x._id,
      url: x.url,
      description: x.description,
      sortOrder: x.sortOrder ?? i * 10,
      socialLinks: x.socialLinks || [] // ✅ REQUIRED
    }));
  });

  this.auth.getAuthState().subscribe(user => {
    this.isAdmin = !!user;
  });
}


  // ✅ NEW: auto detect link type
  detectLinkType(url: string): string {
    if (!url) return 'website';
    if (url.includes('facebook.com')) return 'facebook';
    if (url.includes('linkedin.com')) return 'linkedin';
    if (url.includes('instagram.com')) return 'instagram';
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    return 'website';
  }

  getSortOrder(ref: any, position: 'before' | 'after') {
    const index = this.images.findIndex(i => i.id === ref.id);
    const prev = this.images[index - 1]?.sortOrder ?? ref.sortOrder - 10;
    const next = this.images[index + 1]?.sortOrder ?? ref.sortOrder + 10;

    return position === 'before'
      ? (prev + ref.sortOrder) / 2
      : (ref.sortOrder + next) / 2;
  }

  async saveWithPosition(position: 'before' | 'after') {
    if (!this.isAdmin || !this.editId) return;

    const refImage = this.images.find(i => i.id === this.editId);
    if (!refImage) return;

    let url = '';
    if (this.selectedFile) {
      url = await this.gp.uploadImage(this.selectedFile);
    }

    await this.gp.addGallery({
      url: url || refImage.url,
      description: this.description,
      sortOrder: this.getSortOrder(refImage, position)
    });

    this.reload();
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async save() {
    if (!this.isAdmin) return;

    // 🚫 Limit: only 10 images allowed
    if (!this.editId && this.images.length >= 10) {
      alert('Maximum 10 images allowed in gallery.');
      return;
    }

    let url = '';
    if (this.selectedFile) {
      url = await this.gp.uploadImage(this.selectedFile);
    }

    // ✅ NEW: social link payload
    const socialLinks = this.socialLinkInput
      ? [{
          url: this.socialLinkInput,
          type: this.detectLinkType(this.socialLinkInput)
        }]
      : [];

    if (this.editId) {
      await this.gp.updateGallery(this.editId, {
        description: this.description,
        ...(url && { url }),
        socialLinks // ✅ NEW
      });
    } else {
      await this.gp.addGallery({
        url,
        description: this.description,
        socialLinks // ✅ NEW
      });
    }

    this.reload();
    this.reset();
  }

reload() {
  this.gp.getGallery().subscribe(data => {
    this.images = data.map((x: any) => ({
      id: x._id,
      url: x.url,
      description: x.description,
      socialLinks: x.socialLinks || [] // ✅ REQUIRED
    }));
  });
}


  edit(item: any) {
    if (!this.isAdmin) return;
    this.editId = item.id;
    this.description = item.description;
    this.socialLinkInput = item.socialLinks?.[0]?.url || ''; // ✅ NEW
  }

  delete(id: string) {
    if (!this.isAdmin) return;
    if (confirm('Delete this image?')) {
      this.gp.deleteGallery(id);
    }
  }

  reset() {
    this.editId = null;
    this.description = '';
    this.selectedFile = undefined as any;
    this.socialLinkInput = ''; // ✅ NEW
  }

  openModal(image: any) {
    this.selectedImage = image;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedImage = null;
    document.body.style.overflow = 'auto';
  }
}
