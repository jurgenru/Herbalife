import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ServiceService } from "src/app/services/service.service";

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
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    const filter = `{"order":["id DESC"]}`;
    this.serviceService.get(filter).subscribe((data) => {
      this.lists = data;
      console.log(this.lists);
    });
  }

  showDelete(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.serviceService.deleteById(result).subscribe((statement) => {
        this.lists = [];
        this.get();
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha eliminado el testimonio exitosamente', '5000', 'success', 'top', 'center');
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
