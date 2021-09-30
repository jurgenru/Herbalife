import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "src/app/services/order.service";
import { ProductService } from "src/app/services/product.service";

@Component({
    selector: 'app-order-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

    order: any;
    products: any = [];

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService,
        private productService: ProductService
    ) {
        this.route.params.subscribe((val) => {
            this.orderService.getById(val.id).subscribe((data: any) => {
                this.order = data;
                const productArray = JSON.parse(data.productId);
                productArray.forEach(element => {
                    this.productService.getById(element.id).subscribe((pr: any) => {
                        element.image = pr.image;
                        element.name = pr.name;
                        this.products.push(element);
                    });
                });
            });
        });
    }

    ngOnInit() {
    }

}