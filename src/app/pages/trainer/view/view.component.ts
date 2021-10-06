import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  trainer: any = {};
  lection: any = {};
  socialMedia: any = {}

  constructor(
    private trainerService: TrainerService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(val => {
      this.trainerService.getById(val.id).subscribe((data: any) => {
        if (data.socialMedia) {
          this.socialMedia = JSON.parse(data.socialMedia);
        }
        this.trainer = data;
        this.trainerService.getLectionById(data.id).subscribe(lec => {
          this.lection = lec;
        });
      });
    });
  }

  ngOnInit() {
  }

  openSocialMedia(navUrl){
    window.open(navUrl, "_blank");
  }
}