import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {

  data: any = {};

  constructor() { }

  ngOnInit(): void {
    this.get()
  }
  get(){
    this.data = JSON.parse(localStorage.getItem('virtual-card'));
    console.log(this.data);
  }

}
