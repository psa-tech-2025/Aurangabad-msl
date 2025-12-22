import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.css']
})
export class NavbarHeaderComponent implements OnInit {
    isLoggedIn = false;


  constructor( private translate: TranslateService,
        private auth: AuthService
  ) { 
   
  }

  ngOnInit(): void {
      const savedLang = localStorage.getItem('lang') || 'mr';
  this.translate.use(savedLang);
      // 🔁 Watch login state
    this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
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
  async logout() {
    await this.auth.logout();
  }
}
