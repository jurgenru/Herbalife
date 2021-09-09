import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { StatementService } from "src/app/services/statement.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  lists: any = [];
  filterStatement = "";
  pageActual = 1;

  constructor(
    private userService: UserService,
    private statementService: StatementService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    const filter = `{"fields": {"id": true, "name": true, "description": true, "created": true}, "order":["id DESC"]}`;
    this.userService.me().subscribe((data: any) => {
      this.userService.getStatementByUserId(data.id, filter).subscribe(statement => {
        this.lists = statement;
      });
    });
  }

  showDelete(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.statementService.delete(result).subscribe((statement) => {
        this.statementService.deleteStatementById(result).subscribe(prod => {
          this.lists = [];
          this.get();
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha eliminado el testimonio exitosamente', '5000', 'success', 'top', 'center');
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
