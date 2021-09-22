import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  store: any = {};
  products: any;
  stores: any; 

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private spinner: NgxUiLoaderService,
    private router: Router,
    private cartService: CartService,
  ) {
    this.get();
    this.list();
  }

  ngOnInit() {
   }

  get() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.storeService.getById(val.id).subscribe((data: any) => {
        this.store = data;
        this.storeService.getProductsById(data.id).subscribe(stor => {
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
          this.products = stor;
          console.log('product', this.products);
          this.spinner.stop();
        }, elapsed);
        });
      });
    });
  }

  addToCart(item: any):void{
    this.cartService.addToCart(item);
  }
    
  list() {
    const filter = `{"fields": {"id": true, "icon": true, "title": true}, "order":["id DESC"]}`;
    this.storeService.get(filter).subscribe(data => {
      this.stores = data;
    });
  }

  viewStore(id) {
    this.router.navigate(['/customer/store/view', id]);
    setTimeout(() => {
      location.reload();
    }, 50);

  }

}
