import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

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
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getTotal();
  }

  getTotal(){
      this.product = JSON.parse(localStorage.getItem('cartList'));
      this.grandTotal = this.cartService.getTotalPrice();
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
}
