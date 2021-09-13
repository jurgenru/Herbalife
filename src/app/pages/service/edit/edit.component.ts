import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  content = 'Cargando ...';
  dataService: any = {};
  service: any = {};
  serviceData: any;
  iconImage: any;
  bannerImage: any;
  imageImage: any;
  updateIcon: boolean;
  updateBanner: boolean;
  updateImage: boolean;

  constructor(
    private simpleModalService: SimpleModalService,
    private route: ActivatedRoute,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
    private serviceService: ServiceService
  ) {
    this.serviceView();
  }

  serviceView() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.serviceService.getById(val.id).subscribe(data => {
        this.dataService = data;
        this.updateIcon = true;
        this.updateImage = true;
        this.updateBanner = true;
      });
      this.serviceService.getServiceById(val.id).subscribe(res => {
        const end = new Date();
        const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);
        setTimeout(() => {
          this.serviceData = res;
          this.spinner.stop();
        }, elapsed);
      });
    });
  }

  ngOnInit() { }

  showIcon() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.iconImage = data;
      this.updateIcon = false;
    });
  }

  showBanner() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.bannerImage = data;
      this.updateBanner = false;
    });
  }

  showImage() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageImage = data;
      this.updateImage = false;
    });
  }

  edit() {
    this.content = 'Editando ...';
    const start = new Date();
    this.spinner.start();
    if (this.iconImage) {
      this.service.icon = this.iconImage;
    }
    if (this.bannerImage) {
      this.service.banner = this.bannerImage;
    }
    if (this.imageImage) {
      this.service.image = this.imageImage;
    }
    this.service.userId = this.dataService.userId
    this.serviceService.update(this.dataService.id, this.service).subscribe(data => {
      const end = new Date();
      const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);
      setTimeout(() => {
        this.spinner.stop();
        this.router.navigate(['service/list']);
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado el servicio exitosamente', '5000', 'success', 'top', 'center');
      }, elapsed);
    }, error => {
      this.spinner.stop();
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al editar, intente nuevamente', '5000', 'danger', 'top', 'center');
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
