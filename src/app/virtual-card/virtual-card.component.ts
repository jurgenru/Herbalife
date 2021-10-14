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
        const filter = `{"fields": {"content": true}, "order":["id DESC"]}`;
        this.virtualCardService.getOptionsCardById(data.id, filter).subscribe((res:any) =>{
          res.forEach(element => {
            this.options.push(JSON.parse(element.content));
          });
          console.log('options', this.options)
        })
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.spinner.stop();
        }, elapsed);
      })
    })
  }
}

