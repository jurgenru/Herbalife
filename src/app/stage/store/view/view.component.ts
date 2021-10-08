import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RegisterModalComponent } from 'src/app/components/register-modal/register-modal.component';
import { CartService } from 'src/app/services/cart.service';
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
  stores: any;
  validate: boolean = false;
  userData: any = {};

  constructor(
    private simpleModalService: SimpleModalService,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private spinner: NgxUiLoaderService,
    private router: Router,
    private cartService: CartService,
    private userService: UserService
  ) {
    this.get();
    this.list();
  }

  ngOnInit() { this.initValidate(); }

  
  initValidate(){
    this.userService.me().subscribe((user:any) => {
      const filter = `{"fields": {"id": true}}`;
      this.userService.getById(user.id, filter).subscribe((admin: any) => {
        this.userData = admin;
        if(admin.role == 'admin'){
          this.validate = true;
        }else{
          this.validate = false;
        }
      });
    })
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
            this.spinner.stop();
          }, elapsed);
        });
      }, error => {
        this.spinner.stop();
      });
    });
  }

  addToCart(item) {
      if (this.userData) {
        this.cartService.addToCart(item);
      }else{
        this.showRegister();
      }
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

  showRegister() {
    this.simpleModalService.addModal(RegisterModalComponent, {}, { closeOnClickOutside: true }).subscribe(data => {
      if (data) {
        location.reload();
      }
    });
  }

}
