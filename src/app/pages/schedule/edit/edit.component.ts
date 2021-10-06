import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleModalService } from "ngx-simple-modal";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AppointmentService } from "src/app/services/appointment.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  content = "Cargando ...";
  appointmentData: any = {};
  appointment: any = {};
  constructor(
    private simpleModalService: SimpleModalService,
    private route: ActivatedRoute,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private appointmentService: AppointmentService
  ) {
    this.get();
  }

  get() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe((val) => {
      this.appointmentService.getById(val.id).subscribe((data: any) => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.appointmentData = data;
          this.spinner.stop();
        }, elapsed);
      });
    });
  }

  ngOnInit(): void {}

  edit() {
    this.content = "Editando ...";
    const start = new Date();
    this.spinner.start();
    this.appointment.userId = this.appointment.userId;
    this.appointmentService
      .update(this.appointmentData.id, this.appointment)
      .subscribe(
        (data) => {
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
            this.spinner.stop();
            this.router.navigate(["schedule/list"]);
            this.notification(
              '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado la cita exitosamente',
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
            '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al editar, intente nuevamente',
            "5000",
            "danger",
            "top",
            "center"
          );
        }
      );
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
