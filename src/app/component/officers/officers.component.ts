import { Component, OnInit } from '@angular/core';
import { GpContentService } from 'src/app/services/gp-content.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.css']
})
export class OFFICERSComponent implements OnInit {

  officers: any[] = [];

  // 🔐 login-only controls
  isAdmin = false;

  // form model
form = {
  id: null as string | null,
  name: '',
  post: '',
  phone: '',
  image: '',
  video: '',
  pdf: '',
  socialLinks: {
    facebook: '',
    instagram: '',
    youtube: '',
    website: ''
  }
};


  constructor(
    private gp: GpContentService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {

    // 📖 Public read
    this.gp.getOfficers().subscribe(data => {
this.officers = data.map((o: any, i: number) => ({
  ...o,
  id: o._id,
  sortOrder: o.sortOrder ?? i * 10,
  idDisplay: i + 1
}));


    });

    // 🔐 Logged-in check only
    this.auth.getAuthState().subscribe(user => {
      this.isAdmin = !!user;
    });
  }
  getSortOrder(ref: any, position: 'before' | 'after') {
  const index = this.officers.findIndex(o => o.id === ref.id);

  const prev = this.officers[index - 1]?.sortOrder ?? ref.sortOrder - 10;
  const next = this.officers[index + 1]?.sortOrder ?? ref.sortOrder + 10;

  return position === 'before'
    ? (prev + ref.sortOrder) / 2
    : (ref.sortOrder + next) / 2;
}
saveWithPosition(position: 'before' | 'after') {
  if (!this.isAdmin || !this.form.id) return;

  const refOfficer = this.officers.find(o => o.id === this.form.id);
  if (!refOfficer) return;

  const payload = {
    name: this.form.name,
    post: this.form.post,
    phone: this.form.phone,
    image: this.form.image,
    video: this.form.video,
    pdf: this.form.pdf,
    socialLinks: this.form.socialLinks,
    sortOrder: this.getSortOrder(refOfficer, position)
  };

  this.gp.addOfficer(payload)
    .then(() => this.reload());

  this.reset();
}


 save() {
  if (!this.isAdmin) {
    alert('Unauthorized');
    return;
  }
const payload = {
  name: this.form.name,
  post: this.form.post,
  phone: this.form.phone,
  image: this.form.image,
  video: this.form.video,
  pdf: this.form.pdf,
  socialLinks: this.form.socialLinks
};


  if (this.form.id) {
    this.gp.updateOfficer(this.form.id, payload)
      .then(() => this.reload());
  } else {
    this.gp.addOfficer(payload)
      .then(() => this.reload());
  }

  this.reset();
}


edit(officer: any) {
  this.form = {
    id: officer.id,
    name: officer.name,
    post: officer.post,
    phone: officer.phone,
    image: officer.image || '',
    video: officer.video || '',
    pdf: officer.pdf || '',
    socialLinks: officer.socialLinks || {}
  };
}


delete(id: string) {
  if (!this.isAdmin) {
    alert('Unauthorized');
    return;
  }

  if (confirm('Delete this officer?')) {
    this.gp.deleteOfficer(id)
      .then(() => this.reload());
  }
}
reset() {
  this.form = {
    id: null,
    name: '',
    post: '',
    phone: '',
    image: '',
    video: '',
    pdf: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      youtube: '',
      website: ''
    }
  };
}


  reload() {
  this.gp.getOfficers().subscribe(data => {
this.officers = data.map((o: any, i: number) => ({
  ...o,
  id: o._id,
  sortOrder: o.sortOrder ?? i * 10,
  idDisplay: i + 1
}));

  });
}
onImageSelect(e: any) {
  const file = e.target.files[0];
  if (file) {
    this.gp.uploadImage(file).then(url => this.form.image = url);
  }
}

onVideoSelect(e: any) {
  const file = e.target.files[0];
  if (file) {
    this.gp.uploadImage(file).then(url => this.form.video = url);
  }
}

onPdfSelect(e: any) {
  const file = e.target.files[0];
  if (file) {
    this.gp.uploadImage(file).then(url => this.form.pdf = url);
  }
}
selectedOfficer: any = null;

openModal(officer: any) {
  this.selectedOfficer = officer;
}

closeModal() {
  this.selectedOfficer = null;
}



}
