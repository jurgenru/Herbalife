import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  cardSelect: boolean = false;

  trainerData: any = {};
  trainerName: any;

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
        console.log(this.trainer);
        this.trainerService.getLectionById(data.id).subscribe(lec => {
          this.lection = lec;
        });
      });
    });
  }

  ngOnInit(): void {
  }
  selectCardType(type){
    this.cardSelect = true;
  }
}
