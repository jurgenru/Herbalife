import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  store: any = {};
  products: any;
  features: any;
  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,

  ) {
    this.route.params.subscribe(val => {
      this.storeService.getById(val.id).subscribe(data => {
        this.store = data;
      });
      this.storeService.getProductsById(val.id).subscribe((prod:any) => {
        this.products = prod;
        this.products.forEach(element => {
          element.additionalFeatures = [element.additionalFeatures];
        });
      });
    });
  }

  ngOnInit() {
  }

}
