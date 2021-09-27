import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { SimpleModalComponent } from "ngx-simple-modal";
import { NgbDateStruct, NgbCalendar, NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { PicktimeService } from "src/app/services/pickTime.service";

export interface AlertModel {
  title: string;
}
@Component({
  selector: "app-schedule-call",
  templateUrl: "./schedule-call.component.html",
  styleUrls: ["./schedule-call.component.scss"],
})
export class ScheduleCallComponent
  extends SimpleModalComponent<AlertModel, null>
  implements AlertModel
{
  typeForm: FormGroup;
  timePick: any;
  schedule: any = {};
  title: string;
  types: string[] = ["este", "otro"];
  default: string = "este";
  model: NgbDateStruct;
  toDate: NgbDate;
  date: { year: number; month: number };
  btnBlock: boolean = false;

  constructor(
    private calendar: NgbCalendar,
    private formBuilder: FormBuilder,
    private pickTime: PicktimeService
  ) {
    super();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    this.typeForm = new FormGroup({
      type: new FormControl(null),
    });
    this.typeForm.controls["type"].setValue(this.default, { onlySelf: true });
  }

  confirm() {
    this.close();
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  ngOnInit(): void {
    this.timePick = this.pickTime;
    this.createScheduleForm();
  }

  createScheduleForm() {
    this.schedule = this.formBuilder.group({
      name: ["", Validators.required],
      cellphone: [
        "",
        [Validators.required, Validators.pattern("[0-9]{3}[0-9]{2}[0-9]{3}")],
      ],
      email: ["", [Validators.required, Validators.email]],
      type: [""],
      time: [""],
      day: [""],
    });
  }

  get nameField() {
    return this.schedule.get("name");
  }

  get cellphoneField() {
    return this.schedule.get("cellphone");
  }

  get emailField() {
    return this.schedule.get("email");
  }
  get typeField() {
    return this.schedule.get("type");
  }

  generateTime(data) {
    this.btnBlock = true;
    console.log(data);
    this.schedule.value.time = data;
  }

  generateDay(data) {
    console.log(data);
    data = this.calendar.getToday();
    this.schedule.value.day = data;
  }

  post() {
    console.log(
      this.schedule.value,
      (this.schedule.value.type = this.typeForm.value.type)
    );
  }
}
