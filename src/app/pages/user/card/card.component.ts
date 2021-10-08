import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { ImageCropperComponent } from "src/app/components/image-cropper/image-cropper.component";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card: FormGroup;
  selected: FormGroup;
  optionsAll: any[] = [];
  cardSelect: boolean = false;
  btnOptions: boolean = false;

  userImage: any;
  userBanner: any;

  constructor(
    private SimpleModalService: SimpleModalService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.get();
  }

  createForm(){
    this.card = this.formBuilder.group({
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
    this.userService.me().subscribe((me:any)=>{
      const filter = `{"fields": {"id": true, "name": true, "icon": true}, "order":["id DESC"]}`;
      const filters = `{"fields": {"id": true, "title": true, "icon": true}, "order":["id DESC"]}`;  
      this.userService.getManagerById(me.id).subscribe((data:any) =>{
        this.card.get('names').setValue(data.names+ ' '+ data.lastName);
        this.card.get('image').setValue(data.image);
        this.card.get('socialMedia').setValue(JSON.parse(data.socialMedia));
        this.userService.getBlogById(me.id, filter).subscribe((blog:any) => {
          if(blog.length > 0){
            blog.map(element => {
              this.optionsAll.push({"id": element.id, "name": element.name, "type": "blog"});
            });
          }
        }, error=>console.log(error))
        this.userService.getServicesById(me.id, filter).subscribe((serv:any)=>{
          if(serv.length > 0){
            serv.map(element => {
              this.optionsAll.push({"id": element.id, "name": element.name, "type": "service"});
            });
          }
        }, error => console.log(error))
          this.userService.getStoreById(me.id, filters).subscribe((store:any)=>{
            if(store.length > 0){
              store.map(element => {
                this.optionsAll.push({"id": element.id, "name": element.title, "type": "store"});
              });
            }
            const end = new Date();
            const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
            setTimeout(() => {
                this.spinner.stop();
            }, elapsed);
          console.log('card3', this.card.value);
          console.log('optionsAll', this.optionsAll);
          }, error => console.log(error))
      })
    })
  }

  selectCardType(type){
    this.cardSelect = true;
    this.card.get('cardType').setValue(type);
  }
  
  showImage() {
    this.SimpleModalService.addModal(ImageCropperComponent, {format: 1/1}).subscribe(
      (data) => {
        this.card.value.image = data;
        this.userImage= data;
      }
    );
  }

  showBanner() {
    this.SimpleModalService.addModal(ImageCropperComponent, {format: 16/9}).subscribe(
      (data) => {
        this.card.value.banner = data;
        this.userBanner =data;
      }
    );
  }

  addOption(item){
    if(this.card.value.options.length < 4) {
      this.card.value.options.push({"id": item.id, "name": item.name, "icon":item.icon, "type": item.type});
    }
  }

  removeOption(item){
    this.card.value.options.map((a:any, index:any) =>{
      if(item.id == a.id){
        this.card.value.options.splice(index, 1);
        console.log('remove', this.card.value.options);
      }
    })
  }

  post(){
    const start = new Date();
    this.spinner.start();
    // this.card.value.socialMedia = JSON.stringify(this.card.value.socialMedia);
    localStorage.setItem('virtual-card', JSON.stringify(this.card.value));
    console.log('card',this.card.value);
    const end = new Date();
    const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
    setTimeout(() => {
        this.spinner.stop();
        this.router.navigate(["user/card-view"]);
        this.notification(
          '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se creo su tarjeta virtual exitosamente',
          "5000",
          "success",
          "top",
          "center"
        );
    }, elapsed);
  }

  socialUrl(data){
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
