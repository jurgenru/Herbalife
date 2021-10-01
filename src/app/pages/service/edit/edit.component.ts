import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleModalService } from "ngx-simple-modal";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";
import { ServiceService } from "src/app/services/service.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {

  content: any;
  serviceData: any = {};
  service: any = {};
  updateIcon: number = 2;
  updateImage: number = 2;
  updateBanner: number = 2;
  modes = [
    { value: 'presencial' },
    { value: 'virtual' }
  ];
  icon: any;
  image: any;
  banner: any;
  type: any;

  constructor(
    private simpleModalService: SimpleModalService,
    private serviceService: ServiceService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.get();
  }

  ngOnInit() { }

  get() {
    this.content = "Cargando ...";
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe((val) => {
      this.serviceService.getById(val.id).subscribe((data: any) => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          if (data.icon !== "") {
            this.updateIcon = 0;
          }
          if (data.image !== "") {
            this.updateImage = 0;
          }
          if (data.banner !== "") {
            this.updateBanner = 0;
          }
          this.serviceData = data;
          this.spinner.stop();
        }, elapsed);
      });
    });
  }

  edit() {
    if (this.type !== undefined) {
      this.service.type = this.type;
    }
    this.content = "Editando ...";
    const start = new Date();
    this.spinner.start();
    if (this.icon) {
      this.service.icon = this.icon;
    }
    if (this.banner) {
      this.service.banner = this.banner;
    }
    if (this.image) {
      this.service.image = this.image;
    }
    this.service.userId = this.serviceData.userId;
    this.serviceService.update(this.serviceData.id, this.service).subscribe(
      (data) => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.spinner.stop();
          this.router.navigate(["service/list"]);
          this.notification(
            '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado el servicio exitosamente',
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

  uncheck() {
    var checkbox1 = document.getElementById("normal") as HTMLInputElement;
    var checkbox2 = document.getElementById("test") as HTMLInputElement;
    var checkbox3 = document.getElementById("auto") as HTMLInputElement;

    if (checkbox1.checked) {
      this.type = checkbox1.value;
      checkbox2.checked = null;
      checkbox3.checked = null;
    }
  }

  uncheck2() {
    var checkbox1 = document.getElementById("normal") as HTMLInputElement;
    var checkbox2 = document.getElementById("test") as HTMLInputElement;
    var checkbox3 = document.getElementById("auto") as HTMLInputElement;

    if (checkbox2.checked) {
      this.type = checkbox2.value;
      checkbox1.checked = null;
      checkbox3.checked = null;
    }
  }

  uncheck3() {
    var checkbox1 = document.getElementById("normal") as HTMLInputElement;
    var checkbox2 = document.getElementById("test") as HTMLInputElement;
    var checkbox3 = document.getElementById("auto") as HTMLInputElement;
    if (checkbox3.checked) {
      this.type = checkbox3.value;
      checkbox1.checked = null;
      checkbox2.checked = null;
    }
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

  showIcon() {
    this.simpleModalService
      .addModal(ImageCropperComponent, {format: 1/1})
      .subscribe((data) => {
        this.icon = data;
        this.updateIcon = 1;
      });
  }

  showPortrait() {
    this.simpleModalService
      .addModal(ImageCropperComponent, {format: 16/9})
      .subscribe((data) => {
        this.image = data;
        this.updateImage = 1;
      });
  }

  showBanner() {
    this.simpleModalService
      .addModal(ImageCropperComponent, {format: 16/9})
      .subscribe((data) => {
        this.banner = data;
        this.updateBanner = 1;
      });
  }
}
