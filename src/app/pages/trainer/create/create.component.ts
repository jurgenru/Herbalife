import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { LectionService } from 'src/app/services/lection.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  icon: any;
  image: any;
  banner: any;

  trainer: any = {};
  lection: any = {};
  social: any = {};

  constructor(
    private simpleModalService: SimpleModalService,
    private userService: UserService,
    private trainerService: TrainerService,
    private lectionService: LectionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createTrainerForm();
    this.createLectionForm();
  }

  post() {
    const start = new Date();
    this.spinner.start();
    this.userService.me().subscribe((user: any) => {
      this.trainer.value.userId = user.id;
      this.trainer.value.icon = this.icon;
      this.trainer.value.banner = this.banner;
      this.social.whatsapp = 'https://wa.me/' + this.social.whatsapp;
      this.social.telegram = 'https://t.me/' + this.social.telegram;
      this.trainer.value.socialMedia = JSON.stringify(this.social.value);
      this.lection.value.image = this.image;
      this.trainerService.post(this.trainer.value).subscribe((data: any) => {
        this.lection.value.trainerId = data.id;
        this.lectionService.post(this.lection.value).subscribe(lectionData => {
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
            this.spinner.stop();
            this.router.navigate(['/trainer/list']);
            this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se ha creado el entrenador exitosamente', '5000', 'success', 'top', 'center');
          }, elapsed);
        }, error => {
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al crear la clase', '5000', 'danger', 'top', 'center');
          this.spinner.stop();
        });
      }, error => {
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al añadir al entrenador', '5000', 'danger', 'top', 'center');
        this.spinner.stop();
      });
    });
  }

  createTrainerForm() {
    this.trainer = this.formBuilder.group({
      names: ['', Validators.required],
      description: ['', Validators.required],
      socialMedia: [''],
    });

    this.social = this.formBuilder.group({
      email: ['', Validators.email],
      whatsapp: [''],
      telegram: [''],
      facebook: [''],
      instagram: [''],
      youtube: [''],
      tiktok: ['']
    });
  }

  get names() {
    return this.trainer.get('names');
  }

  get description() {
    return this.trainer.get('description');
  }

  get email() {
    return this.social.get('email');
  }

  get name() {
    return this.lection.get('name');
  }

  get mode() {
    return this.lection.get('mode');
  }

  get titleGratitude() {
    return this.lection.get('titleGratitude');
  }

  get descriptionGratitude() {
    return this.lection.get('descriptionGratitude');
  }

  createLectionForm() {
    this.lection = this.formBuilder.group({
      trainerId: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      mode: ['', Validators.required],
      image: [''],
      titleGratitude: ['', Validators.required],
      descriptionGratitude: ['', Validators.required]
    });
  }

  showIcon() {
    this.simpleModalService.addModal(ImageCropperComponent, {format: 1/1}).subscribe((data) => {
      this.icon = data;
    });
  }

  showBanner() {
    this.simpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe((data) => {
      this.banner = data;
    });
  }

  showImage() {
    this.simpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe((data) => {
      this.image = data;
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
