import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  order: FormGroup;
  orderData: any = {};
  userData: any = {};
  email: any;
  product: any = {};
  payment: string[] = ['efectivo', 'tarjeta'];
  delivery: string[] = ['envio', 'presencial'];
  validate: boolean = false;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private notificationService: NotificationService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.get();
    this.createForm();
  }

  createForm() {
    this.order = this.formBuilder.group({
      paymentMethod: [this.payment[0], Validators.required],
      deliveryMethod: [this.delivery[0], Validators.required],
      phoneNumber: ['', Validators.required],
      nit: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      total: [this.cartService.getTotalPrice()]
    })
  }

  get() {
    this.userService.me().subscribe((user: any) => {
      const filter = `{"fields": {"id": true}}`;
      this.userService.getById(user.id, filter).subscribe((admin: any) => {
        if(admin.role == 'admin'){
          this.validate = true;
        }else{
          this.validate = false;
        }
      });
      this.userService.getProfileById(user.id).subscribe((data: any) => {
        this.userData = data;
        this.order.get('email').setValue(user.email);
        this.order.get('country').setValue(this.userData.country);
        this.order.get('city').setValue(this.userData.city);
        this.order.get('address').setValue(this.userData.address);
      });
    });
  }

  post() {
    const start = new Date();
    this.spinner.start();
    this.order.value.purcharseId = this.userData.userId;
    this.order.value.names = this.userData.names;
    this.order.value.productId = [];
    JSON.parse(localStorage.getItem('cartList')).forEach(element => {
      this.order.value.productId.push({ "id": element.id, "quantity": element.quantity, "total": element.total });
      this.order.value.userId = element.userId;
    });
    this.order.value.productId = JSON.stringify(this.order.value.productId);
    this.orderService.post(this.order.value).subscribe((ord: any) => {
      this.postNotification(this.order.value.userId, ord.id, 'Se hizo un compra en tu tienda', 'order');
      this.postNotification(this.userData.userId, ord.id, 'Hiciste una compra, espere hasta que le confirmen el pedido', 'order');
      // JSON.parse(localStorage.getItem('cartList')).forEach(element => {
      //   this.productService.getById(element.id).subscribe((data: any) => {
      //     this.product = {
      //       'amount': data.amount - element.quantity
      //     }
      //     this.productService.update(element.id, this.product).subscribe(data => {
      //     }, error => {
      //     });
      //   });
      // });
      const end = new Date();
      const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
      setTimeout(() => {
        this.spinner.stop();
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Compra realizada', '5000', 'success', 'top', 'center');
      }, elapsed);
      localStorage.removeItem('cartList');
      this.router.navigate(['/customer/store/order', ord.id]);
    }, error => {
      this.spinner.stop();
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al comprar, intente nuevamente', '5000', 'danger', 'top', 'center');
    });
  }

  postNotification(userId, content, description, reason) {
    const notif = {
      userId: userId,
      content: content.toString(),
      description: description,
      reason: reason
    }
    this.notificationService.post(notif).subscribe(not => {
    });
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
