import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.css']
})
export class NavbarHeaderComponent implements OnInit {

  constructor( private translate: TranslateService) { 
   
  }

  ngOnInit(): void {
      const savedLang = localStorage.getItem('lang') || 'mr';
  this.translate.use(savedLang);
  }

  switchLanguage(event: any) {
    const lang = event.target.value;
    this.translate.use(lang);
  }
    closeNavbar() {
    const navbar = document.getElementById('mainNavbar');
    if (navbar?.classList.contains('show')) {
      navbar.classList.remove('show'); // collapse
    }

}
}
