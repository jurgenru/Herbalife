import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface AlertModel {
  title?:string;
  message:string;
}
@Component({
  selector: 'app-schedule-call',
  templateUrl: './schedule-call.component.html',
  styleUrls: ['./schedule-call.component.scss']
})
export class ScheduleCallComponent extends SimpleModalComponent<AlertModel, boolean> {

  title: string;
  message: string;
  constructor() {
    super();
  }
  confirm() {
    this.result = true;
    this.close();
  }

  ngOnInit(): void {
  }

}
