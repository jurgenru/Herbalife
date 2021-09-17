import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  store: any = {};
  products: any;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private spinner: NgxUiLoaderService
  ) {
    this.get();
  }

  ngOnInit() { }

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
          this.spinner.stop();
        }, elapsed);
        });
      });
    });
  }
}
