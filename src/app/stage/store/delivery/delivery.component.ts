import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  buy: boolean = false;
  public grandTotal: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.grandTotal = this.cartService.getTotalPrice();
  }

  btnBuy(){
    this.buy = true;
  }

  buying(){
    this.buy = false;
  }
}
