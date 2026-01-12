import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GpContentService } from 'src/app/services/gp-content.service';
import { HomeNoticeService } from 'src/app/services/home-notice.service';
import { CATEGORY_LABELS } from 'src/app/models/category-labels';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   services: any[] = [];
  filteredServices: any[] = [];
  searchText = '';
  selectedCategory = 'all';

  categoryLabels = CATEGORY_LABELS;
  categories: string[] = [];
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
  ) {
  //     translate.addLangs(['en', 'mr']);
  // translate.setDefaultLang('mr');
   }

  ngOnInit(): void {


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

  this.services = data.map((s: any) => ({
    ...s,
    id: s._id,
    category: s.category || 'other'   // 👈 DEFAULT CATEGORY
  }));

  // ✅ FILTERED LIST INIT
  this.filteredServices = this.services;
    this.categories = this.preferredCategoryOrder.filter(cat =>
  this.services.some(s => s.category === cat)
);

  // ✅ SAFE CATEGORY LIST
  // this.categories = Array.from(
  //   new Set(
  //     this.services
  //       .map(s => s.category)
  //       .filter(c => c && c.trim().length > 0)
  //   )
  // );

});

  }

  // 🔍 FILTER
  applyFilter() {
    this.filteredServices = this.services.filter(s => {

      const matchCategory =
        this.selectedCategory === 'all' ||
        s.category === this.selectedCategory;

      const matchSearch =
        !this.searchText ||
        s.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.desc.toLowerCase().includes(this.searchText.toLowerCase());

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

}
  
    
    
