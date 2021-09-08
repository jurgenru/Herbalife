import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SimpleModalService } from "ngx-simple-modal";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";
import { StatementService } from "src/app/services/statement.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
})
export class CreateComponent implements OnInit {
  imageContent: any;
  constructor(
    private SimpleModalService: SimpleModalService,
    private formBuilder: FormBuilder,
    private statementService: StatementService,
    private spinner: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

    statement = this.formBuilder.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
  });

  showAlert() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe(
      (data) => {
        this.imageContent = data;
      }
    );
  }

  get nameField() {
    return this.statement.get("name");
  }

  get descriptionField() {
    return this.statement.get("description");
  }

  post() {
    const start = new Date();
    this.spinner.start();

    this.statementService.post(this.statement.value).subscribe((data: any) => {
      this.statement.value.image = this.imageContent;
      this.statement.value.userId = JSON.stringify(data.id);
      console.log(data);
      console.log(this.statement.value);
      this.statementService.post(this.statement.value).subscribe(
        (statementData) => {
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
            console.log(statementData);
            this.spinner.stop();
            this.router.navigate(["/testimony/list"]);
            this.notification(
              '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha completado sus datos exitosamente',
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
            '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al completar sus datos, intente nuevamente',
            "5000",
            "danger",
            "top",
            "center"
          );
        }
      );
    });
  }

  imageCropper() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe(
      (data) => {
        this.imageContent = data;
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
