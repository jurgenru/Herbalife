import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SimpleModalComponent } from "ngx-simple-modal";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";

export interface AlertModel {
  title: string;
}
@Component({
  selector: "app-schedule-call",
  templateUrl: "./schedule-call.component.html",
  styleUrls: ["./schedule-call.component.scss"],
})
export class ScheduleCallComponent
  extends SimpleModalComponent<AlertModel, boolean>
  implements AlertModel
{
  title: string;
  modes: string[] = ["este", "otro"];
  default: string = "este";
  model: NgbDateStruct;
  date: { year: number; month: number; day: number };

  constructor(private calendar: NgbCalendar) {
    super();
  }

  confirm() {
    this.result = true;
    this.close();
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  ngOnInit(): void {}
}
