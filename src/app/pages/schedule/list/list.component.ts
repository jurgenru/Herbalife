import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AppointmentService } from "src/app/services/appointment.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-schedule-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  lists: any = [];
  filterAppointment = "";
  pageActual = 1;

  constructor(
    private userService: UserService,
    private appointeService: AppointmentService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.get();
  }

  get() {
    const filter = `{"fields": {"id": true, "names": true, "schedule": true,"phoneNumber": true, "hour": true, "status": true, "created": true}, "order":["id DESC"]}`;
    this.appointeService.get(filter).subscribe((data: any) => {
      this.lists = data;
    });
  }

  showDelete(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then((result) => {
        this.appointeService.delete(result).subscribe((statement) => {
          this.lists = [];
          this.get();
          this.notification(
            '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha eliminado la cita exitosamente',
            "5000",
            "success",
            "top",
            "center"
          );
        });
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
