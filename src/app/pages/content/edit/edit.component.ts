import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { UserService } from 'src/app/services/user.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { PromotionService } from 'src/app/services/promotion.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  services: any;
  blogs: any;
  trainers: any;
  stores: any;
  selectedOption: any;
  selectedOption2: any;
  selectedOption3: any;
  selectedOption4: any;
  contentLink: any;
  contentLink2: any;
  contentLink3: any;
  contentLink4: any;
  updateImage: number = 2;
  promotion: any;
  updateImage2: number = 2;
  promotion2: any;
  updateImage3: number = 2;
  promotion3: any;
  updateImage4: number = 2;
  promotion4: any;
  imageContent: any;
  imageContent2: any;
  imageContent3: any;
  imageContent4: any;
  updatePromotion: any = {};
  updatePromotion2: any = {};
  updatePromotion3: any = {};
  updatePromotion4: any = {};

  constructor(
    private SimpleModalService: SimpleModalService,
    private userService: UserService,
    private promotionService: PromotionService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxUiLoaderService,
  ) {
    this.get();
  }

  ngOnInit() {
    this.getServices();
    this.getBlogs();
    this.getTrainers();
    this.getStores();
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

  get() {
    this.route.params.subscribe(val => {
      this.userService.getPromotionById(val.id).subscribe((pro: any) => {
        if (pro[0] !== undefined) {
          this.updateImage = 0;
          this.promotion = pro[0];
        }
        if (pro[1] !== undefined) {
          this.updateImage2 = 0;
          this.promotion2 = pro[1];
        }
        if (pro[2] !== undefined) {
          this.updateImage3 = 0;
          this.promotion3 = pro[2];
        }
        if (pro[3] !== undefined) {
          this.updateImage4 = 0;
          this.promotion4 = pro[3];

        }
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
        this.contentLink = `/customer/blog/view/${id}`;
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
        this.contentLink2 = `/customer/service/view/${id}`;
        this.selectedOption2 = `servicio : ${name}`;
        break;
      case 'trainer':
        this.contentLink3 = `/customer/tainer/view/${id}`;
        this.selectedOption3 = `entrenador : ${name}`;
        break;
      case 'blog':
        this.contentLink3 = `/customer/blog/view/${id}`;
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
        this.contentLink4 = `/customer/service/view/${id}`;
        this.selectedOption4 = `servicio : ${name}`;
        break;
      case 'trainer':
        this.contentLink4 = `/customer/tainer/view/${id}`;
        this.selectedOption4 = `entrenador : ${name}`;
        break;
      case 'blog':
        this.contentLink4 = `/customer/blog/view/${id}`;
        this.selectedOption4 = `blog : ${name}`;
        break;
      case 'store':
        this.contentLink4 = `/customer/store/view/${id}`;
        this.selectedOption4 = `categoria : ${name}`;
        break;
      default:
        break;
    }
  }

  imageCropper(id) {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageContent = data;
      this.updateImage = 1;
    });
  }

  imageCropper2(id) {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageContent2 = data;
      this.updateImage2 = 1;
    });
  }

  imageCropper3(id) {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageContent3 = data;
      this.updateImage3 = 1;
    });
  }

  imageCropper4(id) {
    this.SimpleModalService.addModal(ImageCropperComponent).subscribe((data) => {
      this.imageContent4 = data;
      this.updateImage4 = 1;
    });
  }


  edit() {
    const start = new Date();
    this.spinner.start();
    this.userService.me().subscribe((us: any) => {
      if (this.promotion !== undefined) {
        if (this.imageContent !== undefined) {
          this.updatePromotion.image = this.imageContent;
        }
        if (this.contentLink !== undefined) {
          this.updatePromotion.content = this.contentLink;
        }
        this.promotionService.update(us.id, this.updatePromotion).subscribe(up1 => {
        });
      } else {
        const prom1 = {
          image: this.imageContent,
          content: this.contentLink,
          userId: us.id
        }
        this.promotionService.post(prom1).subscribe(cre => {
        });
      }
      if (this.promotion2 !== undefined) {
        if (this.imageContent2 !== undefined) {
          this.updatePromotion2.image = this.imageContent2;
        }
        if (this.contentLink2 !== undefined) {
          this.updatePromotion2.content = this.contentLink2;
        }
        this.promotionService.update(us.id, this.updatePromotion2).subscribe(up1 => {
        });
      } else {
        const prom2 = {
          image: this.imageContent2,
          content: this.contentLink2,
          userId: us.id
        }
        this.promotionService.post(prom2).subscribe(cre => {
        });
      }
      if (this.promotion3 !== undefined) {
        if (this.imageContent3 !== undefined) {
          this.updatePromotion3.image = this.imageContent3;
        }
        if (this.contentLink3 !== undefined) {
          this.updatePromotion3.content = this.contentLink3;
        }
        this.promotionService.update(us.id, this.updatePromotion3).subscribe(up1 => {
        });
      } else {
        const prom3 = {
          image: this.imageContent3,
          content: this.contentLink3,
          userId: us.id
        }
        this.promotionService.post(prom3).subscribe(cre => {
        });
      }
      if (this.promotion4 !== undefined) {
        if (this.imageContent4 !== undefined) {
          this.updatePromotion4.image = this.imageContent4;
        }
        if (this.contentLink4 !== undefined) {
          this.updatePromotion4.content = this.contentLink4;
        }
        this.promotionService.update(us.id, this.updatePromotion4).subscribe(up1 => {
        });
      } else {
        const prom4 = {
          image: this.imageContent4,
          content: this.contentLink4,
          userId: us.id
        }
        this.promotionService.post(prom4).subscribe(cre => {
        });
      }
      const end = new Date();
      const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000) + 6000;
      setTimeout(() => {
        this.spinner.stop();
        this.router.navigate(['/dashboard']);
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> La promocion se ha creado exitosamente', '5000', 'success', 'top', 'center');
      }, elapsed);
    }, error => {
      this.router.navigate(['/']);
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