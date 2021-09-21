import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-blog-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

    content: any;
    profile: any = {};
    dataProfile: any = {};
    updateImage: number = 2;
    image: any;

    constructor(
        private userService: UserService,
        private profileService: ProfileService,
        private simpleModalService: SimpleModalService,
        private spinner: NgxUiLoaderService,
        private toastr: ToastrService,
        private router: Router,
    ) {
        this.get();
    }

    ngOnInit() {
    }

    edit() {
        this.content = 'Editando ...';
        const start = new Date();
        this.spinner.start();
        this.profileService.update(this.dataProfile.id, this.profile).subscribe(data => {
            const end = new Date();
            const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);      
            setTimeout(() => {
                this.router.navigate(['customer/view']);
                this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado su perfil exitosamente', '5000', 'success', 'top', 'center');
                this.spinner.stop();
            }, elapsed);
        }, error => {
            this.spinner.stop();
            this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al editar, intente nuevamente', '5000', 'danger', 'top', 'center');      
        });
    }

    get() {
        this.content = 'Cargando ...';
        const start = new Date();
        this.spinner.start();
        this.userService.me().subscribe((user: any) => {
            this.userService.getProfileById(user.id).subscribe((data: any) => {
                const end = new Date();
                const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);      
                if (data.image !== "") {
                    this.updateImage = 0;
                }
                setTimeout(() => {
                this.dataProfile = data;
                this.spinner.stop();
            }, elapsed);
            });
        });
    }

    showImage() {
        this.simpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
            this.image = data;
            this.updateImage = 1;
            this.profile.image = data;
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