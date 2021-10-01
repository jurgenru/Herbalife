import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  trainer: any = {};
  lection: any = {};
  socialMedia: any = { };

  constructor(
    private route: ActivatedRoute,
    private trainerService: TrainerService,
    private spinner: NgxUiLoaderService
  ) {
    this.get();
  }

  ngOnInit() {
  }

  get() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.trainerService.getById(val.id).subscribe((data: any) => {
        this.trainer = data;
        this.socialMedia = JSON.parse(this.trainer.socialMedia) 
        this.trainerService.getLectionById(data.id).subscribe(lect => {
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
            this.lection = lect;
            this.spinner.stop();
          }, elapsed);
        });
      });
    });
  }

  socialUrl(data){
    return window.open(data, "_blank");
  }
}