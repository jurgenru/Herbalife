import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleModalService } from "ngx-simple-modal";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";
import { StatementService } from "src/app/services/statement.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  content = "Cargando ...";
  dataStatement: any = {};
  statement: any = {};
  description: any = {};
  statementData: any;
  imageStatement: any;
  updateImage: boolean;

  constructor(
    private simpleModalService: SimpleModalService,
    private route: ActivatedRoute,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private statementService: StatementService
  ) {
    this.statementView();
  }

  statementView() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe((val) => {
      this.statementService.getById(val.id).subscribe((data) => {
        this.dataStatement = data;
        this.updateImage = true;
      });
      this.statementService.getStatementsById(val.id).subscribe((res) => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.statementData = res;
          this.spinner.stop();
        }, elapsed);
      });
    });
  }

  ngOnInit(): void {}

  showImage() {
    this.simpleModalService
      .addModal(ImageCropperComponent)
      .subscribe((data) => {
        this.imageStatement = data;
        this.updateImage = false;
      });
  }

  edit() {
    this.content = "Editando ...";
    const start = new Date();
    this.spinner.start();
    if (this.imageStatement) {
      this.statement.image = this.imageStatement;
    }
    this.statement.userId = this.dataStatement.userId;
    this.statementService
      .update(this.dataStatement.id, this.statement)
      .subscribe(
        (data) => {
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
            this.spinner.stop();
            this.router.navigate(["testimony/list"]);
            this.notification(
              '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado el testimonio exitosamente',
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
