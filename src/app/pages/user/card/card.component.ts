import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { VirtualCardService } from 'src/app/services/virtual-card.service';
import { OptionsCardService } from 'src/app/services/options-card.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card: FormGroup;
  content = 'Cargando...';
  selected: FormGroup;
  optionsAll: any = [];
  cardSelect: boolean = false;
  btnOptions: boolean = false;
  btnValidate: boolean = false;

  userImage: any;
  userBanner: any;

  constructor(
    private SimpleModalService: SimpleModalService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private virtualCardService: VirtualCardService,
    private optionsCardService: OptionsCardService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.get();
  }

  createForm() {
    this.card = this.formBuilder.group({
      id: [''],
      userId: ['', Validators.required],
      names: ['', Validators.required],
      image: ['', Validators.required],
      trainerId: [0],
      url: ['htttps://'],
      banner: ['', Validators.required],
      socialMedia: ['', Validators.required],
      cardType: ['', Validators.required],
      options: [[]],
    })
  }

  get() {
    const start = new Date();
    this.spinner.start();
    this.userService.me().subscribe((me: any) => {
      this.card.get('userId').setValue(me.id);
      let virtualCard: any = null;
      const filterus = `{"fields": {"id": true, "names": true, "image": true, "banner": true, "socialMedia": true, "userId": true, "cardType": true}, "order":["id DESC"]}`;
      this.userService.getVirtualCardById(me.id, filterus).subscribe((data: any) => {
        data.forEach(element => {
          virtualCard = element;
        });
        //virtualCard = data;
        console.log('data', data);
        if (virtualCard) {
          this.card.get('id').setValue(virtualCard.id);
          this.card.get('names').setValue(virtualCard.names);
          this.card.get('image').setValue(virtualCard.image);
          this.userImage = virtualCard.image;
          this.card.get('socialMedia').setValue(JSON.parse(virtualCard.socialMedia));
          this.card.get('userId').setValue(virtualCard.userId);
          this.card.get('banner').setValue(virtualCard.banner);
          this.userBanner = virtualCard.banner;
          this.card.get('cardType').setValue(virtualCard.cardType);
          this.virtualCardService.getOptionsCardById(virtualCard.id).subscribe((opt:any)=>{
            opt.forEach(element => {
              this.card.value.options.push(element.content);
            });
          })
          this.btnValidate = true;
          this.cardSelect = true;
        } else {
          this.userService.getManagerById(me.id).subscribe((man: any) => {
            this.card.get('names').setValue(man.names + ' ' + man.lastName);
            this.card.get('image').setValue(man.image);
            this.card.get('socialMedia').setValue(JSON.parse(man.socialMedia));
          })
        }
        const filter = `{"fields": {"id": true, "name": true}, "order":["id DESC"]}`;
        const filters = `{"fields": {"id": true, "title": true}, "order":["id DESC"]}`;
        this.userService.getBlogById(me.id, filter).subscribe((blog: any) => {
          if (blog.length > 0) {
            blog.map(element => {
              this.optionsAll.push({ "id": element.id, "name": element.name, "type": "blog" });
            });
          }
        }, error => console.log(error))
        this.userService.getServicesById(me.id, filter).subscribe((serv: any) => {
          if (serv.length > 0) {
            serv.map(element => {
              this.optionsAll.push({ "id": element.id, "name": element.name, "type": "service" });
            });
          }
        }, error => console.log(error))
        this.userService.getStoreById(me.id, filters).subscribe((store: any) => {
          if (store.length > 0) {
            store.map(element => {
              this.optionsAll.push({ "id": element.id, "name": element.title, "type": "store" });
            });
          }
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
            this.spinner.stop();
          }, elapsed);
          console.log('card3', this.card.value);
        }, error => console.log(error))
      })
    }, error => console.log(error))
  }

  selectCardType(type) {
    this.cardSelect = true;
    this.card.get('cardType').setValue(type);
  }

  showImage() {
    this.SimpleModalService.addModal(ImageCropperComponent, { format: 1 / 1 }).subscribe(
      (data) => {
        this.card.value.image = data;
        this.userImage = data;
      }
    );
  }

  showBanner() {
    this.SimpleModalService.addModal(ImageCropperComponent, { format: 16 / 9 }).subscribe(
      (data) => {
        this.card.value.banner = data;
        this.userBanner = data;
      }
    );
  }

  addOption(item) {
    if (this.card.value.options.length < 4) {
      this.card.value.options.push({ "id": item.id, "name": item.name, "type": item.type });
    }
  }

  removeOption(item) {
    this.card.value.options.map((a: any, index: any) => {
      if (item.id == a.id && item.type == a.type) {
          this.card.value.options.splice(index, 1);
          console.log('remove', this.card.value.options);
      }
    })
  }

  post() {
    this.content = 'Creando Tarjeta Virtual';
    const start = new Date();
    this.spinner.start();
    const cardPost = {
      userId: this.card.value.userId,
      socialMedia: JSON.stringify(this.card.value.socialMedia),
      names: this.card.value.names,
      image: this.card.value.image,
      banner: this.card.value.banner,
      cardType: this.card.value.cardType,
      trainerId: this.card.value.trainerId,
      url: this.card.value.url
    }
    this.virtualCardService.post(cardPost).subscribe((data: any) => {
      this.card.value.options.forEach(element => {
        const options = {
          virtualcardId: data.id,
          content: JSON.stringify(element)
        }
        this.optionsCardService.post(options).subscribe(opt => {
        });
      });
      const end = new Date();
      const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
      setTimeout(() => {
        this.spinner.stop();
        this.router.navigate(["virtual-card/view/", data.id]);
        this.notification(
          '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se creo su tarjeta virtual exitosamente',
          "5000",
          "success",
          "top",
          "center"
        );
      }, elapsed);
    }, error => {
      this.spinner.stop();
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error, intente nuevamente', '5000', 'danger', 'top', 'center');
    });
  }

  edit() {
    this.content = 'Editando...';
    const cardPost = {
      userId: this.card.value.userId,
      socialMedia: JSON.stringify(this.card.value.socialMedia),
      names: this.card.value.names,
      image: this.card.value.image,
      banner: this.card.value.banner,
      cardType: this.card.value.cardType,
      trainerId: this.card.value.trainerId,
      url: this.card.value.url
    }
    const start = new Date();
    this.spinner.start();
    this.virtualCardService.update(this.card.value.id, cardPost).subscribe(data => {
      // this.card.value.options.forEach(element => {
      //   const options = {
      //     virtualcardId: this.card.value.id,
      //     content: JSON.stringify(element)
      //   }
      // });
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
    })
  }

  socialUrl(data) {
    return window.open(data, "_blank");
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
