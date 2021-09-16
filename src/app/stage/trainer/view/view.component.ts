import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  trainer: any = {};
  lection: any = {};

  constructor(
    private route: ActivatedRoute,
    private trainerService: TrainerService
  ) { 
    this.get();
  }

  ngOnInit() {
  }

  get() {
    this.route.params.subscribe(val => {
      this.trainerService.getById(val.id).subscribe((data: any) => {
        this.trainer = data;
        this.trainerService.getLectionById(data.id).subscribe(lect => {
          this.lection = lect;
          console.log(lect);
        });
      });
    });
  }

}
