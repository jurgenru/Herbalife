import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
      blog: [''],
      cardType: ['', Validators.required]
    })
  }

  get(){
    this.userService.me().subscribe((user:any)=>{
      // const filter = `{"fields": {"id": true, "names": true, "icon": true}, "order":["id DESC"]}`;
      // this.userService.getProfileById(user.id).subscribe((data:any) =>{
      //   console.log(data);
      //   this.card.get('names').setValue(data.names);
      // })
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
