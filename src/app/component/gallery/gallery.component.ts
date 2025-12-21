import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
    images = [
    { url: 'assets/karykram/fallagwad-yojana-2.jpeg', description: 'फळगट योजना कार्यक्रम' },
    { url: 'assets/karykram/independence-day.jpeg', description: 'स्वातंत्र्य दिन उत्सव' },
    { url: 'assets/karykram/janamahiti-Adhikar.jpeg', description: 'जन माहिती अधिकार दिन' },
    { url: 'assets/karykram/krushi-banner.jpeg', description: 'कृषी विभाग बॅनर' },
    { url: 'assets/karykram/news-2.jpeg', description: 'समाचार कार्यक्रम २' },
    { url: 'assets/karykram/news-3.jpeg', description: 'समाचार कार्यक्रम ३' },
    { url: 'assets/karykram/news.jpeg', description: 'समाचार कार्यक्रम' },
    { url: 'assets/karykram/sabha-1.jpeg', description: 'सभा कार्यक्रम १' },
    { url: 'assets/karykram/sabha-2.jpeg', description: 'सभा कार्यक्रम २' },
    { url: 'assets/karykram/sabha2.jpeg', description: 'सभा कार्यक्रम दुसरा' },
    { url: 'assets/karykram/sanad.jpeg', description: 'सनद वितरण' },
    { url: 'assets/karykram/sirji-one.jpeg', description: 'माननीय अधिकारी भेट १' },
    { url: 'assets/karykram/sirji.jpeg', description: 'माननीय अधिकारी भेट २' },
    { url: 'assets/karykram/suchana.jpeg', description: 'सूचना कार्यक्रम' },
    { url: 'assets/karykram/wihir-yojana-1.jpeg', description: 'विहीर योजना' },
  ];
  

}
