import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card: FormGroup;
  selected: FormGroup;

  profileImage: any;
  banner: any;
  
  optionsAll: any[] = [];
  cardSelect: boolean = false;
  btnOptions: boolean = false;
  
  constructor(
    private trainerService: TrainerService,
    private route: ActivatedRoute,
    private router: Router,
    private SimpleModalService: SimpleModalService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.get();
  }
  createForm(){
    this.card = this.formBuilder.group({
      trainerId: ['', Validators.required],
      names: ['', Validators.required],
      image: [''],
      banner: [''],
      socialMedia:['', Validators.required],
      cardType: ['', Validators.required],
      options: this.formBuilder.array([])
    })
  }

  get(){
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.card.get('trainerId').setValue(val.id);
      this.trainerService.getById(val.id).subscribe((data: any) => {

        this.card.get('names').setValue(data.names);
        this.card.get('image').setValue(data.icon);
        this.card.get('banner').setValue(data.banner);
        this.card.get('socialMedia').setValue(data.socialMedia);
        this.trainerService.getLectionById(data.id).subscribe((lec:any) => {
          console.log(lec);
          if(lec.length > 0){
            lec.map(element => {
              this.optionsAll.push({"id": element.id, "name": element.name});
            })
          }
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
              this.spinner.stop();
          }, elapsed);
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

  addOption(item){
    if(this.card.value.options.length < 3) {
      this.card.value.options.push({"id": item.id, "name": item.name});
    }
  }

  post(){
    const start = new Date();
    this.spinner.start();
    localStorage.setItem('virtual-card', JSON.stringify(this.card.value));
    console.log('card',this.card.value);
    const end = new Date();
    const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
    setTimeout(() => {
        this.spinner.stop();
        this.router.navigate(["trainer/card-view", this.card.value.trainerId]);
        this.notification(
          '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se creo su tarjeta virtual exitosamente',
          "5000",
          "success",
          "top",
          "center"
        );
    }, elapsed);
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

