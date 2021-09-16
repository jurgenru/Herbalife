import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  service: any = {};

    constructor(
      private route: ActivatedRoute,
      private serviceService: ServiceService
    ) {
      this.get();
    }

    ngOnInit() {}

    get() {
      this.route.params.subscribe(val => {
this.serviceService.getById(val.id).subscribe(ser => {
console.log(ser);
this.service = ser;
});
      });
    }
}