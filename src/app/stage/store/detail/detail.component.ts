import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-store-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { 
    this.get();
  }

  ngOnInit() {
  }

  get() {
    this.route.params.subscribe(val => {
      this.productService.getById(val.id).subscribe(data => {
        console.log(data);
        this.product = data;
      });
    })

  }

}
