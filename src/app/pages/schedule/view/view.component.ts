import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  date: any = {};

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService
  ) {
    this.route.params.subscribe((val) => {
      this.appointmentService.getById(val.id).subscribe((data) => {
        this.date = data;
      })
    });
  }

  ngOnInit(): void {
  }

}
