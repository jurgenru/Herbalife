import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SimpleModalService } from "ngx-simple-modal";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";
import { ProfileService } from "src/app/services/profile.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-customer-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  profile: any = {};
  image: any;

  constructor(
    private simpleModalService: SimpleModalService,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private userService: UserService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createProfileForm();
    this.checkUser();
  }

  createProfileForm() {
    this.profile = this.formBuilder.group({
      names: ['', Validators.required],
      address: ['', Validators.required],
      country: [''],
      city: ['', Validators.required],
    });
  }

  get names() {
    return this.profile.get('names');
  }

  get address() {
    return this.profile.get('address');
  }

  get city() {
    return this.profile.get('city');
  }

  get country() {
    return this.profile('country');
  }

  post() {
    const start = new Date();
    this.spinner.start();
    this.profile.value.image = this.image;
    this.userService.me().subscribe((user: any) => {
      this.profile.value.userId = user.id;
      this.profileService.post(this.profile.value).subscribe(pro => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.router.navigate(['/customer/view']);
          this.spinner.stop();
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se ha creado su perfil exitosamente', '5000', 'success', 'top', 'center');
        }, elapsed);
      }, error => {
        this.spinner.stop();
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al crear su perfil, intente nuevamente', '5000', 'danger', 'top', 'center');
      });
    });
  }

  showImage() {
    this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.image = data;
    });
  }

  checkUser() {
        if (localStorage.getItem('herTok')) {
      this.userService.me().subscribe((user: any) => {
        const filter = `{"fields": {"id": true}}`;
        this.userService.getById(user.id, filter).subscribe((data: any) => {
          switch (data.role) {
            case 'customer':
              this.profileService.getByuserId(user.id).subscribe(prof => {
                if(Object.keys(prof).length === 0) {
                } else {
                  this.router.navigate(['/']);
                }
              });
              break;
          }
        });
      });
    } else {
      this.router.navigate(['/']);
    }
    

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