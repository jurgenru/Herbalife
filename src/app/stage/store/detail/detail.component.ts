import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { RegisterModalComponent } from 'src/app/components/register-modal/register-modal.component';

@Component({
  selector: 'app-store-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  product: any = {};

  constructor(
    private simpleModalService: SimpleModalService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinner: NgxUiLoaderService,
    private cartService: CartService,
    private userService: UserService
  ) {
    this.get();
  }

  ngOnInit() {
  }

  get() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.productService.getById(val.id).subscribe(data => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.product = data;
          this.spinner.stop();
        }, elapsed);
      });
    })
  }

  addToCart(item: any){
    this.userService.me().subscribe(user => {
      if (user) {
        this.cartService.addToCart(item);
      }
    }, error => {
      this.showRegister();
    });
    this.cartService.addToCart(item);
  }

  showRegister() {
    this.simpleModalService.addModal(RegisterModalComponent, {}, { closeOnClickOutside: true }).subscribe(data => {
      if (data) {
        location.reload();
      }
    });
  }

}
