import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtual-card',
  templateUrl: './virtual-card.component.html',
  styleUrls: ['./virtual-card.component.scss']
})
export class VirtualCardComponent implements OnInit {
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

