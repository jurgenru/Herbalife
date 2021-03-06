import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  content = 'Cargando ...';
  userData: any = {};
  image: any;
  icon: any;
  socialMedia: any = {};
  manager: any = {};
  updateImage: number = 2;
  updateIcon: number = 2;
  lat:number;
  lng:number;
  zoom: number = 8;

  constructor(
    private SimpleModalService: SimpleModalService,
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

  ngOnInit() { }

  me() {
    const start = new Date();
    this.spinner.start();
    this.userService.me().subscribe((user: any) => {
      this.managerService.getByUserId(user.id).subscribe((man: any) => {
        const end = new Date();
        const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);
        setTimeout(() => {
          man.forEach(element => {
            if (element.image !== "") {
              this.updateImage = 0;
            }
            if (element.icon !== "") {
              this.updateIcon = 0;
            }
            this.userData = element;
              this.socialMedia = JSON.parse(element.socialMedia);
            this.spinner.stop();
          });
        }, elapsed);
      }, error => {
        this.spinner.stop();
      });
    }, error => {
      this.spinner.stop();
    });
  }

  showImage() {
    this.SimpleModalService.addModal(ImageCropperComponent, {format: 1/1}).subscribe((data) => {
      this.image = data;
      this.updateImage = 1;
      this.manager.image = this.image;
      if(data == null){
        this.updateImage = 0;
      }
    });
  }

  showIcon() {
    this.SimpleModalService.addModal(ImageCropperComponent, {format: 1/1}).subscribe((data) => {
      this.icon = data;
      this.updateIcon = 1;
      this.manager.icon = this.icon;
      if(data == null){
        this.updateIcon = 0;
      }
    });
  }

  edit() {
    this.content = 'Editando ...';
    const start = new Date();
    this.spinner.start();
    this.manager.socialMedia = JSON.stringify(this.socialMedia);
    this.manager.value.coordinates = JSON.stringify([this.lat, this.lng]);
    this.userService.me().subscribe((user: any) => {
      this.managerService.edit(user.id, this.manager).subscribe(man => {
        const end = new Date();
        const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000) + 2000;
        setTimeout(() => {
          this.spinner.stop();
          this.router.navigate(['user/view']);
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado sus datos exitosamente', '5000', 'success', 'top', 'center');
        }, elapsed);
      }, error => {
        this.spinner.stop();
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al editar sus datos, intente nuevamente', '5000', 'danger', 'top', 'center');
      });
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
