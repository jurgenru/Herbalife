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
  options: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxUiLoaderService,
    private virtualCardService: VirtualCardService,
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
        this.virtualCardService.getOptionsCardById(data.id).subscribe((res:any) =>{
          res.forEach(element => {
            this.options.push(JSON.parse(element.content));
          });
        })
      })
    })
    // this.data = JSON.parse(localStorage.getItem('virtual-card'));
    // this.data.socialMedia = JSON.parse(this.data.socialMedia)
    console.log(this.data);
    console.log(this.options)
  }
}

