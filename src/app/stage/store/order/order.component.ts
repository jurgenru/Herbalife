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
  productId: any;
  product: any = [];
  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';
  
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
        this.productId = JSON.parse(res.productId);
        this.productId.forEach(element => {
          this.productService.getById(element.id).subscribe((res:any) => {
            this.product.push({"id": res.id, "idOrder": element.id, "name": res.name, "quantity": element.quantity, "price": res.price, "additionalPrice": parseFloat(res.additionalPrice)*parseInt(element.quantity), "total": element.total});
          })
        });
      });
    });
  }
}
