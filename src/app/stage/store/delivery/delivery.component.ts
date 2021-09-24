import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CartService } from 'src/app/services/cart.service';
import { ManagerService } from 'src/app/services/manager.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { parse } from 'url';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  buy: boolean = false;
  order: FormGroup;
  orderData: any = {};
  userData: any = {};
  email: any;
  product: any = {};
  payment: string[] = ['efectivo', 'tarjeta'];
  delivery: string[] = ['envio','presencial'];

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private managerService: ManagerService,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService
    ) { 
     
    }

  ngOnInit(): void {
    this.get();
    this.createForm();
  }

  createForm(){
    this.order = this.formBuilder.group({
      paymentMethod: [this.payment[0], Validators.required],
      deliveryMethod: [this.delivery[0], Validators.required],
      phoneNumber: ['', Validators.required],
      nit: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      total:[this.cartService.getTotalPrice()]
    })
  }

  get(){
    this.userService.me().subscribe((user:any) => {
      this.managerService.getByUserId(user.id).subscribe((data: any) => {
        data.forEach(element => {
          this.userData = element;
        });
        console.log(this.userData);
        console.log(user);
        this.order.get('email').setValue(user.email);
        this.order.get('phoneNumber').setValue(user.phoneNumber);
        this.order.get('country').setValue(this.userData.country);
        this.order.get('city').setValue(this.userData.city);
        this.order.get('address').setValue(this.userData.address);
      })
    })
  }

  post(){
    this.order.value.purcharseId  = this.userData.userId;
    this.order.value.userId = 1; //no sabía cual más...
    this.order.value.names = this.userData.names;
    this.order.value.status = false;
    this.order.value.productId = [];
    JSON.parse(localStorage.getItem('cartList')).forEach(element => {
      this.order.value.productId.push({"id":element.id, "quantity":element.quantity, "total": element.total});
    });
    this.order.value.productId = JSON.stringify(this.order.value.productId);
    const start = new Date();
    this.spinner.start();
    console.log('post', this.order.value);
    this.orderService.post(this.order.value).subscribe((ord:any) => {
      JSON.parse(localStorage.getItem('cartList')).forEach(element => {
        this.productService.getById(element.id).subscribe((data: any) => {
          // this.product = data;
          // this.product.amount = data.amount - element.quantity;
          this.product = {
            'amount': data.amount - element.quantity
          }
          console.log('product', this.product);
          this.productService.update(element.id,this.product).subscribe( data =>{
          },error => {
            console.log('product',error);
          });
        })
      });
      const end = new Date();
      const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.spinner.stop();
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Compra realizada', '5000', 'success', 'top', 'center');
          this.orderList(ord.id);
        }, elapsed);
        this.buy = true;
        localStorage.removeItem('cartList');
    },error => {
      this.spinner.stop();
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al comprar, intente nuevamente', '5000', 'danger', 'top', 'center');
    });
  }

  orderList(id){
    this.orderService.getById(id).subscribe((res:any)=>{
      this.orderData = res;
      console.log(this.orderData);
    })
  }

  buying(){
    // this.buy = false;
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
