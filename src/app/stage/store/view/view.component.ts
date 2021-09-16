import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

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
  ) {
this.get();
  }

  ngOnInit() { }


  get() {
    this.route.params.subscribe(val => {
      this.storeService.getById(val.id).subscribe((data: any) => {
        this.store = data;
        this.storeService.getProductsById(data.id).subscribe(stor => {
          console.log(stor);
          this.products = stor;
        });
      });
    });
  }
}
