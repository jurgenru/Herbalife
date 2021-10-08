import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-virtual-card',
  templateUrl: './virtual-card.component.html',
  styleUrls: ['./virtual-card.component.css']
})
export class VirtualCardComponent implements OnInit {
  @Input() type: 1 | 2;
  @Input() data: any = {};

  constructor() { }

  ngOnInit(): void {
    this.get();
  }
  get(){
    this.data.socialMedia = JSON.parse(this.data.socialMedia);
    console.log(this.data.socialMedia, this.type);
  }
  
  socialUrl(data){
    return window.open(data, "_blank");
  }
}
