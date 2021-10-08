import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { PromotionService } from 'src/app/services/promotion.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  text: any =  'Cargando ...';
  imageContent: any;
  imageContent2: any;
  imageContent3: any;
  imageContent4: any;
  services: any;
  blogs: any;
  trainers: any;
  stores: any;
  contentLink: any;
  contentLink2: any;
  contentLink3: any;
  contentLink4: any;
  selectedOption: any;
  selectedOption2: any;
  selectedOption3: any;
  selectedOption4: any;
  promotion: any = [];
  // selectedFiles: FileList;
  // currentFileUpload: File;
  // progress: { percentage: number } = { percentage: 0 };

  constructor(
    private SimpleModalService: SimpleModalService,
    private userService: UserService,
    private promotionService: PromotionService,
    private spinner: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService,
    private uploadService: UploadFileService) { 
    this.getContent();
    }

  ngOnInit() {
    this.getServices();
    this.getBlogs();
    this.getTrainers();
    this.getStores();
  }

  imageCropper() {
    this.SimpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe((data) => {
      this.imageContent = data;
    });
  }

  imageCropper2() {
    this.SimpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe((data) => {
      this.imageContent2 = data;
    });
  }

  imageCropper3() {
    this.SimpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe((data) => {
      this.imageContent3 = data;
    });
  }

  imageCropper4() {
    this.SimpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe((data) => {
      this.imageContent4 = data;
    });
  }

  getServices() {
    this.userService.me().subscribe((user: any) => {
      const filter = `{"fields": {"id": true, "title": true}}`;
      this.userService.getServicesById(user.id, filter).subscribe(ser => {
        this.services = ser;
      });
    });
  }

  getBlogs() {
    this.userService.me().subscribe((user: any) => {
      const filter = `{"fields": {"id": true, "name": true}}`;
      this.userService.getBlogById(user.id, filter).subscribe(blo => {
        this.blogs = blo;
      });
    });
  }

  getTrainers() {
    this.userService.me().subscribe((user: any) => {
      const filter = `{"fields": {"id": true, "names": true}}`;
      this.userService.getTrainersById(user.id, filter).subscribe(trai => {
        this.trainers = trai;
      });
    });
  }

  getStores() {
    this.userService.me().subscribe((user: any) => {
      const filter = `{"fields": {"id": true, "title": true}}`;
      this.userService.getStoreById(user.id, filter).subscribe(sto => {
        this.stores = sto;
      });
    });
  }

  content(id, type, name) {
    switch (type) {
      case 'service':
        this.contentLink = `/customer/service/view/${id}`;
        this.selectedOption = `servicio : ${name}`;
        break;
      case 'trainer':
        this.contentLink = `/customer/tainer/view/${id}`;
        this.selectedOption = `entrenador : ${name}`;
        break;
      case 'blog':
        this.contentLink = `}/customer/blog/view/${id}`;
        this.selectedOption = `blog : ${name}`;
        break;
      case 'store':
        this.contentLink = `/customer/store/view/${id}`;
        this.selectedOption = `categoria : ${name}`;
        break;
      default:
        break;
    }
  }

  content2(id, type, name) {
    switch (type) {
      case 'service':
        this.contentLink2 = `/customer/service/view/${id}`;
        this.selectedOption2 = `servicio : ${name}`;
        break;
      case 'trainer':
        this.contentLink2 = `/customer/tainer/view/${id}`;
        this.selectedOption2 = `entrenador : ${name}`;
        break;
      case 'blog':
        this.contentLink2 = `/customer/blog/view/${id}`;
        this.selectedOption2 = `blog : ${name}`;
        break;
      case 'store':
        this.contentLink2 = `/customer/store/view/${id}`;
        this.selectedOption2 = `categoria : ${name}`;
        break;
      default:
        break;
    }
  }
  content3(id, type, name) {
    switch (type) {
      case 'service':
        this.contentLink3 = `/customer/service/view/${id}`;
        this.selectedOption3 = `servicio : ${name}`;
        break;
      case 'trainer':
        this.contentLink3 = `/customer/tainer/view/${id}`;
        this.selectedOption3 = `entrenador : ${name}`;
        break;
      case 'blog':
        this.contentLink3 = `//customer/blog/view/${id}`;
        this.selectedOption3 = `blog : ${name}`;
        break;
      case 'store':
        this.contentLink3 = `/customer/store/view/${id}`;
        this.selectedOption3 = `categoria : ${name}`;
        break;
      default:
        break;
    }
  }

  content4(id, type, name) {
    switch (type) {
      case 'service':
        this.contentLink4 = `customer/service/view/${id}`;
        this.selectedOption4 = `servicio : ${name}`;
        break;
      case 'trainer':
        this.contentLink4 = `customer/tainer/view/${id}`;
        this.selectedOption4 = `entrenador : ${name}`;
        break;
      case 'blog':
        this.contentLink4 = `customer/blog/view/${id}`;
        this.selectedOption4 = `blog : ${name}`;
        break;
      case 'store':
        this.contentLink4 = `customer/store/view/${id}`;
        this.selectedOption3 = `categoria : ${name}`;
        break;
      default:
        break;
    }
  }

  post() {
    const start = new Date();
    this.spinner.start();
    this.userService.me().subscribe((us: any) => {
      if(this.imageContent !== undefined){
        const prom1 = {
          image: this.imageContent,
          content: this.contentLink,
          userId: us.id
        }
        this.promotion.push(prom1);
        this.promotionService.post(prom1).subscribe(pro => {
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
         setTimeout(() => {
          this.spinner.stop();
          this.router.navigate(['/dashboard']);
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> La promocion se ha creado exitosamente', '5000', 'success', 'top', 'center');
         }, elapsed);
        }, error => {
          this.spinner.stop();
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al crear la promocion, intente nuevamente', '5000', 'danger', 'top', 'center');
        });
      };
      if (this.imageContent2 !== undefined) {
        const prom2 = {
          image: this.imageContent2,
          content: this.contentLink2,
          userId: us.id
        }
        this.promotion.push(prom2);
        this.promotionService.post(prom2).subscribe(pro => {
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
         setTimeout(() => {
          this.spinner.stop();
          this.router.navigate(['/dashboard'])
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> La promocion se ha creado exitosamente', '5000', 'success', 'top', 'center');
         }, elapsed);
        }, error => {
          this.spinner.stop();
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al crear la promocion, intente nuevamente', '5000', 'danger', 'top', 'center');
        });
      }

      if(this.imageContent3 !== undefined) {
        const prom3 = {
          image: this.imageContent3,
          content: this.contentLink3,
          userId: us.id
        }
        this.promotion.push(prom3);
        this.promotionService.post(prom3).subscribe(pro => {
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
         setTimeout(() => {
          this.spinner.stop();
          this.router.navigate(['/dashboard'])
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> La promocione se ha creado exitosamente', '5000', 'success', 'top', 'center');
         }, elapsed);
        }, error => {
          this.spinner.stop();
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al crear la promocion, intente nuevamente', '5000', 'danger', 'top', 'center');
        });
      }
      if(this.imageContent4 !== undefined) {
        const prom4 = {
          image: this.imageContent4,
          conten: this.contentLink4,
          userId: us.id
        }
        this.promotion.push(prom4);
        this.promotionService.post(prom4).subscribe(pro => {
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
         setTimeout(() => {
          this.spinner.stop();
          this.router.navigate(['/dashboard'])
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> La promocion se ha creado exitosamente', '5000', 'success', 'top', 'center');
         }, elapsed);
        }, error => {
          this.spinner.stop();
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al crear la promocion, intente nuevamente', '5000', 'danger', 'top', 'center');
        });
      }
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

  getContent() {
    const start = new Date();
    this.spinner.start();
    this.userService.me().subscribe((us: any) => {
      this.userService.getPromotionById(us.id).subscribe(pro => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
       setTimeout(() => {
        if (Object.keys(pro).length === 0) {
        } else {
          this.router.navigate(['/content/edit', us.id]);
        }
        this.spinner.stop();
       }, elapsed);
      }, error => {
        this.spinner.stop(); 
      });
    });
  }

  // selectFile(event) {
  //   this.selectedFiles = event.target.files;
  // }

  // upload() {
  //   this.progress.percentage = 0;

  //   this.currentFileUpload = this.selectedFiles.item(0);
  //   this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe((event: any) => {
  //     if (event.type === HttpEventType.UploadProgress) {
  //       this.progress.percentage = Math.round(100 * event.loaded / event.total);
  //     } else if (event instanceof HttpResponse) {
  //       console.log('File is completely uploaded!');
  //     console.log(JSON.parse(event.body)[0].Location);
  //     }
  //   });

  //   this.selectedFiles = undefined;
  // }
  
}
