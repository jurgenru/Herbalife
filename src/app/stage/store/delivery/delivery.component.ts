import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  buy: boolean = false;
  order: any = {};
  userData: any
  constructor(
    private cartService: CartService,
    private userService: UserService,
    private managerService: ManagerService,
    private formBuilder: FormBuilder,
    ) { 
      this.get();
    }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.order = this.formBuilder.group({
      names: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      ci: ['', Validators.required],
      status: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  get(){
    this.userService.me().subscribe((user:any) => {
      this.managerService.getByUserId(user.id).subscribe((data: any) => {
        data.forEach(element => {
          this.userData = element;
          console.log(element);
        });
        this.order.value.names = this.userData.names;
        this.order.value.country = this.userData.country
        this.order.value.city = this.userData.city;
        this.order.value.address = this.userData.address;
        this.order.value.email = user.email;
        this.order.value.userId = user.id;
        this.order.value.total = this.cartService.getTotalPrice();
      })
    })
  }

    // id
    // productId
    // userId
    // purcharseId
    // commentary
    // country
    // city 
    // names 
    // phoneNumber
    // email 
    // nit 
    // address 
    // total 
    // status 

  post(){
    this.order.value.productId =  [];
    JSON.parse(localStorage.getItem('cartList')).forEach(element => {
      this.order.value.productId.push({"id":element.id, "quantity":element.quantity, "total": element.total});
    });

    console.log('post', this.order.value);
    // this.buy = true;
  }

  buying(){
    this.buy = false;
  }
}
