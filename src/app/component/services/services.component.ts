import { Component, OnInit } from '@angular/core';
import { GpContentService } from 'src/app/services/gp-content.service';
import { AuthService } from 'src/app/services/auth.service';
import { COMMON_DEFAULT_FORM, CATEGORY_OPTIONS } from 'src/app/common/common-form.config';
import { ContactInfoService } from 'src/app/services/contact-info.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  contactPhone: string | null = null;
 schemes: any[] = [];
  isAdmin = false;

  // ✅ use COMMON category config
  categories = CATEGORY_OPTIONS;

  // ✅ FULL FORM = scheme fields + common fields
  form: any = {
    id: null,

    // scheme specific
    name: '',
    desc: '',
    link: '',
    category: 'business',

    // 🔥 common fields
    ...COMMON_DEFAULT_FORM
  };

  constructor(
    private gp: GpContentService,
    private auth: AuthService,
     private contactInfo: ContactInfoService
  ) {}

  ngOnInit(): void {
    this.loadSchemes();

    this.auth.getAuthState().subscribe(user => {
      this.isAdmin = !!user;
    });
      // ✅ RECEIVE PHONE
  this.contactInfo.phone$.subscribe(phone => {
    this.contactPhone = phone;
  });
  }

  loadSchemes() {
    this.gp.getSchemes().subscribe((data: any[]) => {
      this.schemes = data.map((s: any) => ({
        ...s,
        id: s._id
      }));
    });
  }

  save() {
    if (!this.isAdmin) return;

    const payload = { ...this.form };
    delete payload.id;

    if (this.form.id) {
      this.gp.updateScheme(this.form.id, payload)
        .then(() => this.loadSchemes());
    } else {
      this.gp.addScheme(payload)
        .then(() => this.loadSchemes());
    }

    this.reset();
  }

  edit(scheme: any) {
    this.form = {
      id: scheme.id,
      name: scheme.name,
      desc: scheme.desc,
      link: scheme.link,
      category: scheme.category || 'business',

      // 🔥 load common fields safely
      extraText: scheme.extraText || '',
      description: scheme.description || '',
      image: scheme.image || '',
      images: scheme.images || [],
      video: scheme.video || '',
      pdf: scheme.pdf || '',
      socialLinks: scheme.socialLinks || [],
      seo: scheme.seo || { metaTitle: '', metaDescription: '', keywords: [] },
      active: scheme.active ?? true,
      featured: scheme.featured ?? false
    };
  }

  delete(id: string) {
    if (!this.isAdmin) return;

    if (confirm('Delete this scheme?')) {
      this.gp.deleteScheme(id)
        .then(() => this.loadSchemes());
    }
  }

  reset() {
    this.form = {
      id: null,
      name: '',
      desc: '',
      link: '',
      category: 'business',
      ...COMMON_DEFAULT_FORM
    };
  }
  enquiryNow(schemeName: string) {
  if (!this.contactPhone) {
    alert('Contact number not available');
    return;
  }

  const phone = this.contactPhone.replace(/[^0-9]/g, '').slice(-10);

  const message =
    `Thank you for contacting SA ELECTRONICS.%0A%0A` +
    `Enquiry for service: ${schemeName}%0A` +
    `Please share more details.`;

  const url = `https://wa.me/91${phone}?text=${message}`;
  window.open(url, '_blank');
}


}
