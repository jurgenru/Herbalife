import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RegisterModalComponent } from 'src/app/components/register-modal/register-modal.component';
import { InscriptionLection } from 'src/app/services/inscription-lection';
import { NotificationService } from 'src/app/services/notification.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/service.service';
import { ContactFormComponent } from 'src/app/components/contact-form/contact-form.component';

@Component({
  selector: 'app-trainer-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  trainer: any = {};
  lection: any = {};
  validate: any = {};
  socialMedia: any = { };
  validateAdmin: boolean = false;
  
  randomService: any;
  showRandomService: any;

  constructor(
    private route: ActivatedRoute,
    private trainerService: TrainerService,
    private spinner: NgxUiLoaderService,
    private router: Router,
    private inscriptionLectionService: InscriptionLection,
    private userService: UserService,
    private simpleModalService: SimpleModalService,
    private notificationService: NotificationService,
    private toastr: ToastrService,
    private serviceService: ServiceService,
  ) {
    this.get();
    this.getRandomService();
  }

  ngOnInit() {this.initValidate();  }
  
  initValidate(){
    this.userService.me().subscribe((user:any) => {
      const filter = `{"fields": {"id": true}}`;
      this.userService.getById(user.id, filter).subscribe((admin: any) => {
        if(admin.role == 'admin'){
          this.validateAdmin = true;
        }else{
          this.validateAdmin = false;
        }
      });
    })
  }

  get() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.trainerService.getById(val.id).subscribe((data: any) => {
        this.trainer = data;
        this.socialMedia = JSON.parse(this.trainer.socialMedia) 
        this.trainerService.getLectionById(data.id).subscribe(lect => {
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
            this.lection = lect;
            this.spinner.stop();
          }, elapsed);
        });
      }, error => {
        this.spinner.stop();
      });
    });
  }
  getRandomService(){
    const filter = `{"fields": {"image": true}, "order":["created DESC"]}`
    this.serviceService.get(filter).subscribe((data:any) => {
      if(data.length >0){
        this.showRandomService=true;
        var randomNumber = Math.round(Math.random() * (data.length));
        this.randomService=data[randomNumber].image;
      }
      else{
        this.showRandomService=false;
      }
    });
  }
  registerClass() {
    this.userService.me().subscribe((user: any) => {
    const ins = {
      lectionId: this.trainer.id,
      userId: (user.id).toString(),
    }
    let value = false;
    this.userService.getInscriptionLectionById(ins.userId).subscribe(res => {
      this.validate = res;
      this.validate.map((a:any)=>{
        if(a.lectionId === ins.lectionId){
          return  value = true;
        }
      })
      if(value){
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Usted cuenta con una inscripción de la clase', '5000', 'warning', 'top', 'center');
      }else{
        this.inscriptionLectionService.post(ins).subscribe(inscrip => {
          this.postNotification(user.id, this.trainer.id, 'Te inscribiste en una clase', 'lection');
          switch (this.lection.mode) {
            case 'presencial':
              this.router.navigate(['/customer/trainer/information']);
              
              break;
            case 'virtual':
      
            break;
          }
        });
      }
    })
  }, error => {
    this.showRegister();
  });
  }

  socialUrl(data){
    return window.open(data, "_blank");
  }

  openContactForm(email){
    this.simpleModalService.addModal(
      ContactFormComponent,
      {
        title: "Enviar Correo Electrónico",
        toEmail: email,
        name: this.trainer.names,
      },
      { closeOnClickOutside: true }
    );
  }

  postNotification(userId, content, description, reason) {
    const notif = {
      userId: userId,
      content: content.toString(),
      description: description,
      reason: reason
    }
    this.notificationService.post(notif).subscribe(not => {
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


  showRegister() {
    this.simpleModalService.addModal(RegisterModalComponent, {}, { closeOnClickOutside: true }).subscribe(data => {
      if (data) {
        location.reload();
      }
    });
  }
}