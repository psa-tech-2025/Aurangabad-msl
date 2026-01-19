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
  sortOrder: x.sortOrder ?? i * 10
}));

  });

  this.auth.getAuthState().subscribe(user => {
    this.isAdmin = !!user;
  });

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

  // 🚫 Limit: only 10 images allowed (for ADD only)
  if (!this.editId && this.images.length >= 10) {
    alert('Maximum 10 images allowed in gallery.');
    return;
  }

  let url = '';

  if (this.selectedFile) {
    url = await this.gp.uploadImage(this.selectedFile);
  }

  if (this.editId) {
    // ✏️ UPDATE (no limit check)
    await this.gp.updateGallery(this.editId, {
      description: this.description,
      ...(url && { url })
    });
  } else {
    // ➕ ADD
 await this.gp.addGallery({
  url,
  description: this.description
});

this.reload();

  }

  this.reset();
}

reload() {
  this.gp.getGallery().subscribe(data => {
    this.images = data.map((x: any) => ({
      id: x._id,
      url: x.url,
      description: x.description
    }));
  });
  this.reset();
}

  edit(item: any) {
    if (!this.isAdmin) return;
    this.editId = item.id;
    this.description = item.description;
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
  }
  openModal(image: any) {
  this.selectedImage = image;
  document.body.style.overflow = 'hidden'; // disable background scroll
}

closeModal() {
  this.selectedImage = null;
  document.body.style.overflow = 'auto';
}
}
