import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  imageProfile: any;
  icon: any;
  lat: number;
  lng: number;
  zoom: number = 8;

  constructor(
    private SimpleModalService: SimpleModalService,
    private fb: FormBuilder,
    private userService: UserService,
    private managerService: ManagerService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.me();
    this.lat = -16.489689;
    this.lng = -68.119293;
  }

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
    coordinates: [''],
    socialMedia: this.fb.group({
      whatsapp: [''],
      telegram: [''],
      facebook: [''],
      instagram: [''],
      youtube: [''],
      tiktok: [''],
      email: ['']
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
    this.user.value.socialMedia.whatsapp = 'https://wa.me/' + this.user.value.socialMedia.whatsapp;
    this.user.value.socialMedia.telegram = 'https://t.me/' + this.user.value.socialMedia.telegram;
    this.user.value.coordinates = JSON.stringify([this.lat, this.lng]);
    this.user.value.socialMedia = JSON.stringify(this.user.value.socialMedia);
    const start = new Date();
    this.spinner.start();
    this.userService.me().subscribe((user: any) => {
      this.user.value.userId = user.id;
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
    this.SimpleModalService.addModal(ImageCropperComponent, {format: 1/1}).subscribe((data) => {
      this.imageProfile = data;
      this.user.value.image = this.imageProfile;
    });
  }

  showIcon() {
    this.SimpleModalService.addModal(ImageCropperComponent, {format: 1/1}).subscribe((data) => {
      this.icon = data;
      this.user.value.icon = this.icon;
    });
  }

  me() {
    this.userService.me().subscribe((user: any) => {
      this.managerService.getByUserId(user.id).subscribe(man => {
        if (man) {
          this.router.navigate(['user/view']);
        }
      });
    }, error => {
      this.router.navigate(['/']);
    })
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

  markerDragEnd($event: MouseEvent) {
    console.log('dragEnd', $event);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    console.log('lat: ', this.lat);
    console.log('lng: ', this.lng);
  }

  mapClicked($event: MouseEvent) {
    if(this.markers.length < 1){
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true
      });
    } else {
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> No se puede a??adir mas de un marcador', '5000', 'danger', 'top', 'center');
    }
  }

  markers: marker[] = []

  getCurrentPosition(){
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.zoom = 17;
      console.log(this.lat);
      console.log(this.lng);
    })
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
