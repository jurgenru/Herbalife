import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TrainerService } from 'src/app/services/trainer.service';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';

@Component({
  selector: 'app-trainer-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  content: any;
  trainerData: any = {};
  lectionData: any = {};
  socialMedia: any = {};
  updateIcon: number = 2;
  updateImage: number = 2;
  updateBanner: number = 2;
  icon: any;
  banner: any;
  image: any;
  trainer: any = {};
  lection: any = {};

  constructor(
    private trainerService: TrainerService,
    private route: ActivatedRoute,
    private spinner: NgxUiLoaderService,
    private simpleModalService: SimpleModalService,
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
      this.trainerService.getById(val.id).subscribe((data: any) => {
        this.trainerService.getLectionById(data.id).subscribe((lec: any) => {
          const end = new Date();
          const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);
          setTimeout(() => {
            if (data.icon !== "") {
              this.updateIcon = 0;
            }
            if (data.banner !== "") {
              this.updateBanner = 0;
            }
            if (data.socialMedia) {
              this.socialMedia = JSON.parse(data.socialMedia);
            }
            if (lec.image !== "") {
              this.updateImage = 0;
            }
            this.trainerData = data;
            this.lectionData = lec;
            this.spinner.stop();
          }, elapsed);
        });
      });
    });
  }

  showIcon() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.icon = data;
      this.updateIcon = 1;
    });
  }

  showImage() {
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