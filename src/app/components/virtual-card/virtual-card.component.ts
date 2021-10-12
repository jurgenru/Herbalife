import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-virtual-card-component',
  templateUrl: './virtual-card.component.html',
  styleUrls: ['./virtual-card.component.css']
})
export class VirtualCardComponent implements OnInit {
  @Input() type: 1 | 2;
  @Input() data: any = {};
  @Input() options: any = {};

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }
  
  socialUrl(data){
    return window.open(data, "_blank");
  }
  optionOpen(option){
    switch (option.type){
      case 'store':
        this.router.navigate(['customer/store/view/' + option.id])
      break;
      case 'blog':
        this.router.navigate(['customer/blog/view/' + option.id]);
      break;
      case 'service':
        this.router.navigate(['customer/service/view/' + option.id])
      break;
      case 'lection':
        this.router.navigate(['customer/trainer/view/' + option.id])
      break;
      default:
      break;
    }
  }
}
