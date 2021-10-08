import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card: FormGroup;
  cardSelect: boolean = false;
  userData: any = {};
  constructor(
    private SimpleModalService: SimpleModalService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
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
      socialMedia:[''],
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
        this.card.get('socialMedia').setValue(data.socialMedia);
        this.userService.getBlogById(me.id, filter).subscribe((blog:any) => {
          if(blog.length > 0){
            blog.map(element => {
              this.card.value.options.push({"id": element.id, "name": element.name, "icon":element.icon, "type": "blog"});
            });
          }
        }, error=>console.log(error))
        this.userService.getServicesById(me.id, filter).subscribe((serv:any)=>{
          if(serv.length > 0){
            serv.map(element => {
              this.card.value.options.push({"id": element.id, "name": element.name, "icon":element.icon, "type": "service"});
            });
          }
        }, error => console.log(error))
          this.userService.getStoreById(me.id, filters).subscribe((store:any)=>{
            if(store.length > 0){
              store.map(element => {
                this.card.value.options.push({"id": element.id, "name": element.title, "icon":element.icon, "type": "store"});
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
    })
  }

  selectCardType(type){
    this.cardSelect = true;
    this.card.get('cardType').setValue(type);
  }

  post(){
    //const start = new Date();
    //this.spinner.start();
    console.log('card',this.card.value);
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
