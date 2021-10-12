import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { VirtualCardService } from '../services/virtual-card.service';

@Component({
  selector: 'app-virtual-card',
  templateUrl: './virtual-card.component.html',
  styleUrls: ['./virtual-card.component.css']
})
export class VirtualCardComponent implements OnInit {
  data: any = {};
  type: number=1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxUiLoaderService,
    private virtualCardService: VirtualCardService
  ) { }

  ngOnInit(): void {
    this.get()
  }
  get(){
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.virtualCardService.getById(val.id).subscribe((data:any)=>{
        this.data = data;
        this.data.socialMedia = JSON.parse(this.data.socialMedia);
        this.data.options = JSON.parse(this.data.options);
      })
    })
    // this.data = JSON.parse(localStorage.getItem('virtual-card'));
    // this.data.socialMedia = JSON.parse(this.data.socialMedia)
    console.log(this.data);
  }
}

