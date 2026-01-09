import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample-gramppanchayat';
    constructor(private translate: TranslateService) {

    // Supported languages
    translate.addLangs(['en', 'mr']);

    // Default language → English
    translate.setDefaultLang('en');

    // Use saved language OR English
    const savedLang = localStorage.getItem('lang') || 'en';
    translate.use(savedLang);
  }
}
