import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  public cartItemList : any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor(private toastr: ToastrService,) { }
  
  init(){
    let countData = JSON.parse(localStorage.getItem('cartList'));
    if(countData){
      if(this.cartItemList == ''){
      if(countData.length > 0){
        countData.map((a:any) =>{
        this.cartItemList.push(a);
        })
      }
    }
    }
  }

  getProducts(){
    return this.productList.asObservable();
  }

  addToCart(product:any){
    this.init();
    product.quantity = parseInt(product.quantity) + 1;
    if(product.total){
      Object.assign(product, {quantity: product.quantity, total: parseFloat(product.price)*parseInt(product.quantity)});
    }else{
      Object.assign(product, {quantity: 1, total: product.price});
    }
    this.cartItemList.map((a:any, index:any) => {
      if(product.id == a.id){
        this.cartItemList.splice(index, 1);
      }
    })
    this.cartItemList.push(product);
    const start = new Date();
    this.productList.next(this.cartItemList);
    localStorage.setItem('cartList', JSON.stringify(this.cartItemList));
    this.getTotalPrice();
    const end = new Date();
    const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
    setTimeout(() => {
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se añadio al carrito', '5000', 'success', 'top', 'center');
    }, elapsed);
  }

  quantityProduct(product: any){
    this.init();
    if(product.quantity > 0){
      Object.assign(product, {quantity: product.quantity, total: parseFloat(product.price)*parseInt(product.quantity)});
      this.cartItemList.map((a:any, index:any) => {
        if(product.id == a.id){
          this.cartItemList.push(product);
          this.cartItemList.splice(index, 1);

        }
      })
      this.productList.next(this.cartItemList);
      localStorage.setItem('cartList', JSON.stringify(this.cartItemList));
    }
  }

  getTotalPrice():number{
    let grandTotal = 0;
    let cartList = JSON.parse(localStorage.getItem('cartList'));
    cartList.map((a:any)=>{
      grandTotal += parseFloat(a.total);
    })
    return grandTotal;
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any) =>{
      if(product.id == a.id){
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
    localStorage.setItem('cartList', JSON.stringify(this.cartItemList));
    this.getTotalPrice();
  }

  removeAllCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    localStorage.setItem('cartList', JSON.stringify(this.cartItemList));
    this.getTotalPrice();
  }

  notification(content, time, type, from, align) {
    this.toastr.error(content, '', {
      timeOut: time,
      closeButton: true,
      enableHtml: true,
      toastClass: `alert alert-${type} alert-with-icon`,
      positionClass: 'toast-' + from + '-' + align
    });
  }
}
