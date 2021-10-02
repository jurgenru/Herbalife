import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-store-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderData: any = {};
  product: any;
  
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private productService: ProductService,
    ) { this.get() }

  ngOnInit(): void {}
  get(){
    this.route.params.subscribe(val => {
      this.orderService.getById(val.id).subscribe((res: any) => {
        this.orderData = res;
        this.product = JSON.parse(res.productId);
        console.log(this.orderData);
        console.log(this.product);
      });
    });
  }
}
