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
import { SimpleModalService } from "ngx-simple-modal";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { UserService } from "src/app/services/user.service";
import { AppointmentService } from "src/app/services/appointment.service";
import { Router } from "@angular/router";

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

  constructor(
    private calendar: NgbCalendar,
    private formBuilder: FormBuilder,
    private pickTime: PicktimeService,
    private toastr: ToastrService,
    private spinner: NgxUiLoaderService,
    private userService: UserService,
    private appointmentService: AppointmentService,
    private router: Router
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

  schedule = this.formBuilder.group({
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
    return this.schedule.get("name");
  }

  get cellphoneField() {
    return this.schedule.get("cellphone");
  }

  get emailField() {
    return this.schedule.get("email");
  }

  generateTime(data) {
    this.btnBlock = true;
    this.schedule.value.time = data;
    console.log(data);
  }

  generateDay(data) {
    data = this.calendar.getToday();
    // (data) => `${data.year}-${data.month}-${data.day}`;
    this.schedule.value.day = data;
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
      this.schedule.value.userId = user.id;
      console.log(this.schedule.value);
      this.appointmentService.post(this.schedule.value).subscribe(
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
