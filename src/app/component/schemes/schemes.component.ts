import { Component, OnInit } from '@angular/core';
import { GpContentService } from 'src/app/services/gp-content.service';
import { AuthService } from 'src/app/services/auth.service';
import { COMMON_DEFAULT_FORM, CATEGORY_OPTIONS } from 'src/app/common/common-form.config';
import { ContactInfoService } from 'src/app/services/contact-info.service';
import { CATEGORY_LABELS } from 'src/app/models/category-labels';

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.css']
})
export class SCHEMESComponent implements OnInit {
  contactPhone: string | null = null;
  schemes: any[] = [];
  isAdmin = false;
  showNewCategory = false;
newCategory = '';

  // ✅ use COMMON category config

categories = CATEGORY_OPTIONS;
categoryLabels = CATEGORY_LABELS;


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
    this.schemes = data
      .map((s: any, i: number) => ({
        ...s,
        id: s._id,
        category: s.category || 'other',
        sortOrder: s.sortOrder ?? i * 10   // 🔥 fallback
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  });
}

onCategoryChange() {
  this.showNewCategory = this.form.category === '__other__';
  if (!this.showNewCategory) {
    this.newCategory = '';
  }
}

save() {
  if (!this.isAdmin) return;

  if (this.showNewCategory && this.newCategory.trim()) {
    this.form.category = this.newCategory.trim().toLowerCase();
  }

  const payload = { ...this.form };
  delete payload.id;

  if (this.form.id) {
    this.gp.updateScheme(this.form.id, payload).then(() => this.loadSchemes());
  } else {
    this.gp.addScheme(payload).then(() => this.loadSchemes());
  }

  this.reset();
}


getSortOrder(ref: any, position: 'before' | 'after') {
  const index = this.schemes.findIndex(s => s.id === ref.id);

  const prev = this.schemes[index - 1]?.sortOrder ?? ref.sortOrder - 10;
  const next = this.schemes[index + 1]?.sortOrder ?? ref.sortOrder + 10;

  return position === 'before'
    ? (prev + ref.sortOrder) / 2
    : (ref.sortOrder + next) / 2;
}
saveWithPosition(position: 'before' | 'after') {
  if (!this.isAdmin || !this.form.id) return;

  const refScheme = this.schemes.find(s => s.id === this.form.id);
  if (!refScheme) return;

  const payload: any = {
    ...this.form,
    sortOrder: this.getSortOrder(refScheme, position) // ✅ real ordering
  };

  delete payload.id;

  this.gp.addScheme(payload).then(() => {
    this.loadSchemes();
    this.reset();
  });
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
    category: 'other',
    ...COMMON_DEFAULT_FORM
  };

  this.showNewCategory = false;
  this.newCategory = '';
}

  enquiryNow(schemeName: string) {
  // ✅ Default fallback number
  const DEFAULT_PHONE = '9766871928';

  // Use contactPhone if available, otherwise fallback
  const rawPhone = this.contactPhone || DEFAULT_PHONE;

  const phone = rawPhone.replace(/[^0-9]/g, '').slice(-10);

  const message =
    `Thank you for contacting SA ELECTRONICS.%0A%0A` +
    `Enquiry for service: ${schemeName}%0A` +
    `Please share more details.`;

  const url = `https://wa.me/91${phone}?text=${message}`;
  window.open(url, '_blank');
}
}
