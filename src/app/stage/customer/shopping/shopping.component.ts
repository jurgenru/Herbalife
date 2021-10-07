import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  order: any = {};
  product: any = [];
  constructor( 
    private userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit(): void { this.get(); }

  get(){
    this.userService.me().subscribe((user:any)=>{
      const filter = `{"fields": {"id": true, "total": true, "productId": true}, "order":["id DESC"]}`;
      this.userService.getOrderById(user.id, filter).subscribe((res:any) =>{
        res.forEach(element => {
          this.order = element;
          JSON.parse(this.order.productId).forEach(prod => {
            this.productService.getById(prod.id).subscribe((res:any)=>{
              this.product.push({'id': res.id, 'name': res.name, 'image': res.image, 'quantity': prod.quantity, 'total': prod.total});
            })
          });
        });
      })
    })
  }

}
