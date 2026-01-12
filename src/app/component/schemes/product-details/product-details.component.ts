import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GpContentService } from 'src/app/services/gp-content.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private gp: GpContentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gp.getSchemeById(id).subscribe(res => {
        this.product = res;
        this.loading = false;
      });
    }
  }
}
