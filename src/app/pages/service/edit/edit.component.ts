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

  content: any;
  serviceData: any = {};
  updateIcon: number = 2;
  updateImage: number = 2;
  updateBanner: number = 2;
  icon: any;
  image: any;
  banner: any;

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

  ngOnInit() {
  }

  get() {
    this.content = 'Cargando ...';
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.serviceService.getById(val.id).subscribe((data: any) => {
        const end = new Date();
        const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);
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

  showIcon() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.icon = data;
      this.updateIcon = 1;
    });
  }

  showPortrait() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.image = data;
      this.updateImage = 1;
    });
  }

  showBanner() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.banner = data;
      this.updateBanner = 1;
    });
  }

}
