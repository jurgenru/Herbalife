import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  imageProfile: any;

  constructor(
    private SimpleModalService: SimpleModalService,
    private fb: FormBuilder,
    private userService: UserService,
    private managerService: ManagerService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(
  ) {
  }

  user = this.fb.group({
    names: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    country: ['', Validators.required],
    idHerbalife: [''],
    levelHerbalife: [''],
    city: [''],
    postalCode: [''],
    socialMedia: this.fb.group({
      whatsapp: [''],
      telegram: [''],
      facebook: [''],
      instagram: [''],
      youtube: [''],
      tiktok: [''],
      gmail: ['']
    }),
  })

  get names() {
    return this.user.get('names');
  }

  get lastName() {
    return this.user.get('lastName');
  }

  get address() {
    return this.user.get('address');
  }

  get country() {
    return this.user.get('country');
  }

  post() {
    this.user.value.socialMedia = JSON.stringify(this.user.value.socialMedia);
    const start = new Date();
    this.spinner.start();
    this.userService.me().subscribe((user: any) => {
      this.user.value.userId = user.id;
      this.user.value.image = this.imageProfile;
      this.managerService.post(this.user.value).subscribe(data => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.spinner.stop();
          this.router.navigate(['user/view']);
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha completado sus datos exitosamente', '5000', 'success', 'top', 'center');
        }, elapsed);
      }, error => {
        this.spinner.stop();
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al completar sus datos, intente nuevamente', '5000', 'danger', 'top', 'center');
      })
    });
  }

  imageCropper() {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageProfile = data;
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
