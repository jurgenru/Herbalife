import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TrainerService } from 'src/app/services/trainer.service';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { ToastrService } from 'ngx-toastr';
import { LectionService } from 'src/app/services/lection.service';

@Component({
  selector: 'app-trainer-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  content: any;
  trainerData: any = {};
  lectionData: any = {};
  socialMediaData: any = {};
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
    private lectionService: LectionService,
    private route: ActivatedRoute,
    private spinner: NgxUiLoaderService,
    private simpleModalService: SimpleModalService,
    private toastr: ToastrService,
    private router: Router,
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
            this.socialMediaData = JSON.parse(data.socialMedia);
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
    this.simpleModalService.addModal(ImageCropperComponent, {format: 1/1}).subscribe((data) => {
      this.icon = data;
      this.updateIcon = 1;
      this.trainer.icon = data;
      if(data == null){
        this.updateIcon = 0;
      }
    });
  }

  showImage() {
    this.simpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe((data) => {
      this.image = data;
      this.updateImage = 1;
      this.lection.image = data;
      if(data == null){
        this.updateImage = 0;
      }
    });
  }

  showBanner() {
    this.simpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe((data) => {
      this.banner = data;
      this.updateBanner = 1;
      this.trainer.banner = data;
      if(data == null){
        this.updateBanner = 0;
      }
    });
  }

  editTrainer() {
    this.content = 'Editando ...';
    const start = new Date();
    this.spinner.start();
    this.trainer.socialMedia = JSON.stringify(this.socialMedia);
    this.trainerService.edit(this.trainerData.id, this.trainer).subscribe(data => {
      const end = new Date();
      const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
      setTimeout(() => {
        this.spinner.stop();
        this.router.navigate(['/trainer/list']);
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado el entrenador exitosamente', '5000', 'success', 'top', 'center');
      }, elapsed);
    }, error => {
      this.spinner.stop();
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al editar el entrenador, intente nuevamente', '5000', 'danger', 'top', 'center');
    });
  }

  editLection() {
    this.content = 'Editando ...';
    const start = new Date();
    this.spinner.start();
    this.lectionService.edit(this.lectionData.id, this.lection).subscribe(data => {
      const end = new Date();
      const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
      setTimeout(() => {
        this.spinner.stop();
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado la clase exitosamente', '5000', 'success', 'top', 'center');
      }, elapsed);
    }, error => {
      this.spinner.stop();
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al editar la clase, intente nuevamente', '5000', 'danger', 'top', 'center');
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
