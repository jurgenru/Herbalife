import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
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

  modeForm: FormGroup;
  services: number;
  icon: any;
  banner: any;
  image: any;
  service: any = {};
  serviceType: any = {};
  modes: string[] = ['presencial', 'virtual'];
  default: string = 'presencial';
  type: any = 'normal';
  user: any;
  statusAuto: boolean = false;
  statusTest: boolean = false;

  constructor(
    private SimpleModalService: SimpleModalService,
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
    private spinner: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    this.showUser();
    this.modeForm = new FormGroup({
      mode: new FormControl(null)
    });
    this.modeForm.controls['mode'].setValue(this.default, { onlySelf: true });
  }

  ngOnInit() {
    this.createServiceForm();
  }

  createServiceForm() {
    this.service = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      title: ["", Validators.required],
      titleGratitude: ["", Validators.required],
      descriptionGratitude: ["", Validators.required],
    });
  }

  showIcon() {
    this.SimpleModalService.addModal(ImageCropperComponent, { format: 1 / 1 }).subscribe(
      (data) => {
        this.icon = data;
      }
    );
  }

  showImage() {
    this.SimpleModalService.addModal(ImageCropperComponent, { format: 16 / 9 }).subscribe(
      (data) => {
        this.image = data;
      }
    );
  }

  showBanner() {
    this.SimpleModalService.addModal(ImageCropperComponent, { format: 16 / 9 }).subscribe(
      (data) => {
        this.banner = data;
      }
    );
  }


  showUser() {
    this.userService.me().subscribe((user: any) => {
      this.user = user;
      this.existService();
    });
  }

  post() {
    this.service.value.type = this.type;
    this.service.value.mode = this.modeForm.value.mode
    const start = new Date();
    this.spinner.start();

    this.service.value.userId = this.user.id;
    this.service.value.icon = this.icon;
    this.service.value.banner = this.banner;
    this.service.value.image = this.image;
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
  }

  existService() {
    const filter = `{"fields": {"id": true, "type": true}}`;
    this.userService.getServicesById(this.user.id, filter).subscribe((ser: any) => {
      const auto = ser.find(service => service.type === 'auto');
      const test = ser.find(service => service.type === 'test');
      if (auto) {
        this.statusAuto = true;
      }
      if (test) {
        this.statusTest = true;
      }
      if(auto && test) {
        var checkbox1 = document.getElementById("normal") as HTMLInputElement;
        checkbox1.disabled = true;
      }
    });
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

  get name() {
    return this.service.get("name");
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

}
