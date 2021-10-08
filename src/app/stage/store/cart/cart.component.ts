import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public product : any = [];
  public grandTotal : number = 0;
  quantity : number = 1;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTotal();
  }

  getTotal(){
      if(JSON.parse(localStorage.getItem('cartList'))){
        this.product = JSON.parse(localStorage.getItem('cartList'));
        this.grandTotal = this.cartService.getTotalPrice();
      }
  }

  addQuantity(item:any){
    if(item.quantity < item.amount){
      item.quantity = parseInt(item.quantity) + 1;
      this.cartService.quantityProduct(item);
      this.grandTotal = this.cartService.getTotalPrice();
    }else{
      this.cartService.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> No se dispone con una cantidad mayor a '+`${item.quantity}`+' del producto: '+`${item.name}`, '5000', 'warning', 'top', 'center');
    }
  }
  removeQuantity(item:any){
    if(item.quantity > 1){
      item.quantity = parseInt(item.quantity) - 1;
      this.cartService.quantityProduct(item);
      this.grandTotal = this.cartService.getTotalPrice();
    }
  }

  removeItem(item:any){
    this.cartService.removeCartItem(item);
    this.getTotal();
  }
  
  emptyCart(){
    this.cartService.removeAllCart();
    this.getTotal();
  }

  buy(){
    this.userService.me().subscribe((user: any) => {
      const filter = `{"fields": {"id": true}}`;
      this.userService.getById(user.id, filter).subscribe((admin: any) => {
        if(admin.role == 'admin'){
          return this.cartService.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> No dispone con los permisos necesarios para realizar una compra.', '5000', 'warning', 'top', 'center');
        }else{
          this.router.navigate(['/customer/store/delivery']);
        }
      });
    })
  }
}
