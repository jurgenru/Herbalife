import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';
import { VirtualCardService } from 'src/app/services/virtual-card.service';
import { UserService } from 'src/app/services/user.service';
import { OptionsCardService } from 'src/app/services/options-card.service';

@Component({
  selector: 'app-trainer-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card: FormGroup;
  selected: FormGroup;
  optionsAll: any[] = [];
  content = 'Cargando...';
  profileImage: any;
  banner: any;
  
  cardSelect: boolean = false;
  btnOptions: boolean = false;
  btnValidate: boolean = false;
  
  constructor(
    private trainerService: TrainerService,
    private route: ActivatedRoute,
    private router: Router,
    private SimpleModalService: SimpleModalService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private virtualCardService: VirtualCardService,
    private userService: UserService,
    private optionsCardService: OptionsCardService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.get();
  }
  createForm(){
    this.card = this.formBuilder.group({
      userId: ['0'],
      names: ['', Validators.required],
      image: [''],
      trainerId: ['', Validators.required],
      url: ['htttps://'],
      banner: [''],
      socialMedia: ['', Validators.required],
      cardType: ['', Validators.required],
      options: [[]],
    })
  }

  get(){
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.card.get('userId').setValue(val.id);
      let virtualCard: any = null;
      this.trainerService.getVirtualCardById(val.id).subscribe((data: any)=>{
        virtualCard = data;
      })
      this.trainerService.getById(val.id).subscribe((data: any) => {
        if(virtualCard){
          // virtualCard = JSON.parse(localStorage.getItem('virtual-card'));
          this.card.get('names').setValue(virtualCard.names);
          this.card.get('image').setValue(virtualCard.image);
          this.card.get('socialMedia').setValue(JSON.parse(virtualCard.socialMedia));
          this.card.get('userId').setValue(virtualCard.userId);
          this.card.get('banner').setValue(virtualCard.banner);
          this.card.get('cardType').setValue(virtualCard.cardType);
          this.card.get('trainer').setValue(virtualCard.trainerId);
          // JSON.parse(virtualCard.options).map((opt:any)=>{
          //   console.log('res', virtualCard.options);
          //   this.card.value.options.push({ "id": opt.id, "name": opt.name, "type": opt.type });
          // })
          this.btnValidate = true;
          this.cardSelect = true; 
        }else{
          this.card.get('trainerId').setValue(data.id);
          this.card.get('names').setValue(data.names);
          this.card.get('image').setValue(data.icon);
          this.card.get('banner').setValue(data.banner);
          this.card.get('socialMedia').setValue(JSON.parse(data.socialMedia));
        }
        this.trainerService.getLectionById(data.id).subscribe((lec:any=[]) => {
          console.log('lec', lec);
          this.optionsAll.push({"id": lec.id, "name": lec.name, "type": "lection"});
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
              this.spinner.stop();
          }, elapsed);
          console.log('card.options', this.card.value.options);
        });
      });
    });
  }
  selectCardType(type){
    this.cardSelect = true;
    this.card.get('cardType').setValue(type);
  }
  
  showImage() {
    this.SimpleModalService.addModal(ImageCropperComponent, {format: 1/1}).subscribe(
      (data) => {
        this.card.value.image = data;
        this.profileImage = data;
      }
    );
  }

  showBanner() {
    this.SimpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe(
      (data) => {
        this.card.value.banner = data;
        this.banner = data;
      }
    );
  }

  post(){
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
  
    this.virtualCardService.post(cardPost).subscribe((data:any) => {
      console.log('post', data);
      this.optionsAll.forEach(element => {
        const options = {
          virtualCardId: data.id,
          content: JSON.stringify(element)
        }
        this.optionsCardService.post(options).subscribe(opt => {
        })
      })
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
    })
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
    this.virtualCardService.update(this.card.value.id, cardPost).subscribe((data:any) => {
      console.log('edit', data);
      // this.optionsAll.forEach(element => {
      //   const options = {
      //     virtualCardId: data.id,
      //     content: JSON.stringify(element)
      //   }
      //   this.optionsCardService.update(data.id,options).subscribe(opt => {
      //   })
      // })
      const end = new Date();
      const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000) + 2000;
      setTimeout(() => {
        this.spinner.stop();
        this.router.navigate(['user/view']);
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha editado sus datos exitosamente', '5000', 'success', 'top', 'center');
      }, elapsed);
    }, error => {
      this.spinner.stop();
      this.card.value.socialMedia = JSON.parse(this.card.value.socialMedia);
      // this.card.value.options =JSON.parse(this.card.value.options);
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

