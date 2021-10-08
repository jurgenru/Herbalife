import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {
  data: any = {};
  type: number=1;

  constructor() { }

  ngOnInit(): void {
    this.get()
  }
  get(){
    this.data = JSON.parse(localStorage.getItem('virtual-card'));
    this.data.socialMedia = JSON.parse(this.data.socialMedia)
    console.log(this.data);
  }
}
