import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GpContentService } from 'src/app/services/gp-content.service';
import { HomeNoticeService } from 'src/app/services/home-notice.service';
import { CATEGORY_LABELS } from 'src/app/models/category-labels';
import { ContactInfoService } from 'src/app/services/contact-info.service';
import { CATEGORY_OPTIONS } from 'src/app/common/common-form.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    contactPhone: string | null = null;
   services: any[] = [];
  filteredServices: any[] = [];
  searchText = '';

categories = CATEGORY_OPTIONS;
categoryLabels = CATEGORY_LABELS;
selectedCategory = 'all';
notices: any[] = [];
  announcements: any[] = [];
  images: any[] = [];
    members: any[] = [];
     maps: any[] = [];
     
       // ✅ ADD THIS
  about: any = {
    intro: '',
    servicesIntro: '',
    contactAddress: '',
    contactPhone: '',
    contactEmail: ''
  };
  
  // ✅ ADD THIS
  officers: any[] = [];
         preferredCategoryOrder = [
  'business',
  'ecommerce',
  'service',
  'digital',
  'marketing',
  'design',
  'development',
  'consulting',
  'training',
  'other'
];


  // homePosts: any[];
  constructor( private router : Router,
    private gp: GpContentService,
    private noticeService: HomeNoticeService,
      private contactInfo: ContactInfoService
  ) {
  //     translate.addLangs(['en', 'mr']);
  // translate.setDefaultLang('mr');
   }

  ngOnInit(): void {
      this.contactInfo.phone$.subscribe(phone => {
    this.contactPhone = phone;
  });

        // ✅ FETCH ABOUT DATA (SAME AS ABOUT PAGE)
    this.gp.getAbout().subscribe(data => {
      if (data) {
        this.about = data;
      }
    });
        // ✅ OFFICERS (LIMIT FOR HOME)
    this.gp.getOfficers().subscribe(data => {
      this.officers = data.slice(0, 4); // 👈 show only 4 on home
    });
    
    // Gallery
    this.gp.getGallery().subscribe(data => {
      this.images = data;
    });


    // ✅ Firestore notices
    this.gp.getHomeNotices().subscribe(res => {
      this.notices = res;
    });

    // ✅ Firestore announcements
    this.gp.getHomeAnnouncements().subscribe(res => {
      this.announcements = res;
    });

       this.gp.getHomeIntro().subscribe(res => {
      this.members = res;
    });
    
      this.gp.getHomeMap().subscribe(res => {
      this.maps = res;
    });
        // ✅ LOAD SERVICES / PRODUCTS
this.gp.getSchemes().subscribe(data => {

  this.services = data
    .map((s: any, i: number) => ({
      ...s,
      id: s._id,
      category: s.category || 'other',
      sortOrder: s.sortOrder ?? i * 10
    }))
    .filter(s => s.active !== false) // ✅ ONLY ACTIVE
    .sort((a, b) => a.sortOrder - b.sortOrder);

  this.filteredServices = [...this.services];

  // ✅ Keep config categories but show only used ones
  this.categories = this.preferredCategoryOrder.filter(cat =>
    this.services.some(s => s.category === cat)
  );
});




  }

  // 🔍 FILTER
applyFilter() {
  const search = this.searchText.toLowerCase().trim();

  this.filteredServices = this.services.filter(s => {
    const matchCategory =
      this.selectedCategory === 'all' ||
      s.category === this.selectedCategory;

    const matchSearch =
      !search ||
      s.name?.toLowerCase().includes(search) ||
      s.desc?.toLowerCase().includes(search);

    return matchCategory && matchSearch;
  });
}
  // READ MORE
  goToServices() {
    this.router.navigate(['/services']);
  }
  
   navigateToGallery() {
    this.router.navigate(['/gallery']);
  }
   // ✅ READ MORE
  goToOfficers() {
    this.router.navigate(['/officers']);
  }
enquiryNow(schemeName: string) {
  // ✅ Default fallback number
  const DEFAULT_PHONE = '9730918695';

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
  
    
    
