import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SimpleModalComponent } from "ngx-simple-modal";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

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
  modeForm: FormGroup;
  title: string;
  modes: string[] = ["este", "otro"];
  default: string = "este";
  model: NgbDateStruct;
  date: { year: number; month: number };

  constructor(private calendar: NgbCalendar) {
    super();

    this.modeForm = new FormGroup({
      mode: new FormControl(null),
    });
    this.modeForm.controls["mode"].setValue(this.default, { onlySelf: true });
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
