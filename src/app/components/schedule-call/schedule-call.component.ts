import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { SimpleModalComponent } from "ngx-simple-modal";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDate,
} from "@ng-bootstrap/ng-bootstrap";
import { PicktimeService } from "src/app/services/pickTime.service";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user.service";
import { AppointmentService } from "src/app/services/appointment.service";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";

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
  title: string;
  types: string[] = ["este", "otro"];
  default: string = "este";
  model: NgbDateStruct;
  toDate: NgbDate;
  date: { year: number; month: number };
  btnBlock: boolean = false;
  status: boolean = true;

  constructor(
    private calendar: NgbCalendar,
    private formBuilder: FormBuilder,
    private pickTime: PicktimeService,
    private toastr: ToastrService,
    private userService: UserService,
    private appointmentService: AppointmentService,
    private router: Router,
    private spinner: NgxUiLoaderService
  ) {
    super();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

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
  }

  appointment = this.formBuilder.group({
    names: ["", Validators.required],
    phoneNumber: [
      "",
      [Validators.required, Validators.pattern("[0-9]{3}[0-9]{2}[0-9]{3}")],
    ],
    email: ["", [Validators.required, Validators.email]],
    // type: [""],
    hour: [""],
    schedule: [""],
  });

  get nameField() {
    return this.appointment.get("names");
  }

  get cellphoneField() {
    return this.appointment.get("phoneNumber");
  }

  get emailField() {
    return this.appointment.get("email");
  }

  generateTime(data) {
    this.btnBlock = true;
    this.appointment.value.hour = data;
    console.log(data);
  }

  generateDay(data) {
    data = this.calendar.getToday();
    // (data) => `${data.year}-${data.month}-${data.day}`;
    this.appointment.value.schedule = JSON.stringify(data);
    console.log(data);
  }

  post() {
    // console.log(
    //   this.schedule.value,
    //   (this.schedule.value.type = this.typeForm.value.type)
    // );
    // this.schedule.value.type = this.typeForm.value.type;
    const start = new Date();
    this.spinner.start();

    this.userService.me().subscribe((user: any) => {
      this.appointment.value.userId = user.id;
      this.appointment.value.status = this.status;
      console.log(this.appointment.value);
      this.appointmentService.post(this.appointment.value).subscribe(
        (data) => {
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
            this.spinner.stop();
            this.router.navigate(["home"]);
            this.notification(
              '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se creo su cita de consulta',
              "5000",
              "success",
              "top",
              "center"
            );
          }, elapsed);
        },
        (error) => {
          this.spinner.stop();
          this.notification(
            '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al crear su cita de consulta, intente nuevamente',
            "5000",
            "danger",
            "top",
            "center"
          );
        }
      );
    });
  }

  notification(content, time, type, from, align) {
    this.toastr.error(content, "", {
      timeOut: time,
      closeButton: true,
      enableHtml: true,
      toastClass: `alert alert-${type} alert-with-icon`,
      positionClass: "toast-" + from + "-" + align,
    });
  }
}
