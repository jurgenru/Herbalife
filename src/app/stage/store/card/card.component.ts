import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  public product : any = [];
  public grandTotal : number = 0;

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getTotal();
  }

  getTotal(){
      this.product = JSON.parse(localStorage.getItem('carList'));
      this.grandTotal = this.storeService.getTotalPrice();
  }

  removeItem(item:any){
    this.storeService.removeCardItem(item);
    this.getTotal();
  }
  
  emptyCard(){
    this.storeService.removeAllCard();
    this.getTotal();
  }
}
