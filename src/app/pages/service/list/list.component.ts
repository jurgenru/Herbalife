import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ServiceService } from "src/app/services/service.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-service-list",
  templateUrl: "./list.component.html",
})
export class ListComponent implements OnInit {
  lists: any = [];
  filterService = "";
  pageActual = 1;

  constructor(
    private serviceService: ServiceService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    const filter = `{"fields": {"id": true, "title": true, "mode": true, "description": true, "created": true}, "order":["id DESC"]}`;
    this.userService.me().subscribe((data: any) => {
      this.userService.getServicesById(data.id, filter).subscribe(service => {
        this.lists = service;
      });
    })
  }

  showDelete(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.serviceService.delete(result).subscribe((statement) => {
        this.serviceService.deleteServiceById(result).subscribe(prod => {
          this.lists = [];
          this.get();
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha eliminado el servicio exitosamente', '5000', 'success', 'top', 'center');
        })
      });
    });
  }

  notification(content, time, type, from, align) {
    this.toastr.error(content, '', {
      timeOut: time,
      closeButton: true,
      enableHtml: true,
      toastClass: `alert alert-${type} alert-with-icon`,
      positionClass: 'toast-' + from + '-' + align
    });
  }
}
