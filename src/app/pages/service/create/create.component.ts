import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SimpleModalService } from "ngx-simple-modal";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";
import { ServiceService } from "src/app/services/service.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-service-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
})
export class CreateComponent implements OnInit {
  services: number;

  imageIcon: any;
  imageCover: any;
  imageDescription: any;

  Types: any = ["Virtual", "Presencial"];
  service: any = {};
  serviceType: any = {};
  constructor(
    private SimpleModalService: SimpleModalService,
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
    private spinner: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createServiceForm();
  }

  createServiceForm() {
    this.service = this.formBuilder.group({
      name: ["", Validators.required],
      mode: ["", Validators.required],
      description: ["", Validators.required],
      title: ["", Validators.required],
      titleGratitude: ["", Validators.required],
      descriptionGratitude: ["", Validators.required],
      type: [""],
    });

    this.serviceType = this.formBuilder.group({
      checkbox1: [false],
      checkbox2: [false],
      checkbox3: [false],
    });
  }

  showMessage(stCb1: any, stCb2: any, stCb3: any) {
    if (this.serviceType.value.checkbox1 == true) {
      this.service.value.type = "Normal";
    } else if (this.serviceType.value.checkbox2 == true) {
      this.service.value.type = "Encuesta de Emprendedores";
    } else {
      this.service.value.type = "Otros";
    }
  }

  imageCropper() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe(
      (data) => {
        this.imageIcon = data;
      }
    );
  }

  imageCropper1() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe(
      (data) => {
        this.imageCover = data;
      }
    );
  }

  imageCropper2() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe(
      (data) => {
        this.imageDescription = data;
      }
    );
  }

  post() {
    const start = new Date();
    this.spinner.start();
    this.showMessage(
      this.serviceType.value.checkbox1,
      this.serviceType.value.checkbox2,
      this.serviceType.value.checkbox3
    );

    this.userService.me().subscribe((user: any) => {
      this.service.value.userId = user.id;
      this.service.value.icon = this.imageIcon;
      this.service.value.video = this.imageCover;
      this.service.value.image = this.imageDescription;
      this.serviceService.post(this.service.value).subscribe(
        (data) => {
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
            this.spinner.stop();
            this.router.navigate(["service/list"]);
            this.notification(
              '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se creo su servicio exitosamente',
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
            '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al crear su servicio, intente nuevamente',
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

  get name() {
    return this.service.get("name");
  }

  get mode() {
    return this.service.get("mode");
  }
  get description() {
    return this.service.get("description");
  }
  get title() {
    return this.service.get("title");
  }
  get titleGratitude() {
    return this.service.get("titleGratitude");
  }
  get descriptionGratitude() {
    return this.service.get("descriptionGratitude");
  }
  get type() {
    return this.serviceType.get("checkbox1");
  }
  get type1() {
    return this.serviceType.get("checkbox2");
  }
  get type2() {
    return this.serviceType.get("checkbox3");
  }
}
