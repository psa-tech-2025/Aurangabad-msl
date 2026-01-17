import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactInfoService } from 'src/app/services/contact-info.service';
import { GpContentService } from 'src/app/services/gp-content.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  contactPhone: string | null = null;
  product: any;
  loading = true;
  selectedImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private gp: GpContentService,
       private contactInfo: ContactInfoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gp.getSchemeById(id).subscribe(res => {
        this.product = res;
        this.loading = false;
      });
    }
              // ✅ RECEIVE PHONE
  this.contactInfo.phone$.subscribe(phone => {
    this.contactPhone = phone;
  });
  }
  enquiryNow(productName: string) {
  const DEFAULT_PHONE = '9766871928';
  const rawPhone = this.contactPhone || DEFAULT_PHONE;
  const phone = rawPhone.replace(/[^0-9]/g, '').slice(-10);

  const message =
    `Thank you for contacting SA ELECTRONICS.%0A%0A` +
    `Enquiry for service: ${productName}%0A` +
    `Please share more details.`;

  const url = `https://wa.me/91${phone}?text=${message}`;
  window.open(url, '_blank');
}

selectImage(img: string) {
  this.selectedImage = img;
}

}
