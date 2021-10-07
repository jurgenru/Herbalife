import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RegisterModalComponent } from 'src/app/components/register-modal/register-modal.component';
import { InscriptionService } from 'src/app/services/inscription-service';
import { ManagerService } from 'src/app/services/manager.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-service-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  service: any = {};
  services: any;
  validate: any = {};
  validateAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private userService: UserService,
    private spinner: NgxUiLoaderService,
    private simpleModalService: SimpleModalService,
    private inscriptionService: InscriptionService,
    private router: Router,
    private toastr: ToastrService,
    private notificationService: NotificationService
  ) {
    this.get();
    this.list();
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
      const filter = `{"fields": {"descriptionGratitude": false, "titleGratitude": false, "modified": false}}`;
      this.serviceService.getById(val.id, filter).subscribe(ser => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.service = ser;
          this.spinner.stop();
        }, elapsed);
      });
    }, error => {
      this.spinner.stop();
    });
  }

  list() {
    const filter = `{"fields": {"id": true, "icon": true, "title": true}, "order":["id DESC"]}`;
    this.serviceService.get(filter).subscribe(data => {
      this.services = data;
    });
  }

  viewService(id) {
    this.router.navigate(['/customer/service/view', id]);
    setTimeout(() => {
      location.reload();
    }, 50);
  }

  registerService(type){
    this.userService.me().subscribe((user: any) => {
      const ins = {
        userId: user.id,
        serviceId: this.service.id
      }
      let value = false;
      this.userService.getInscriptionById(ins.userId).subscribe(res => {
        this.validate = res;
        this.validate.map((a:any)=>{
          if(a.serviceId === ins.serviceId){
            return value = true;
          }
        })
        if(value){
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Usted cuenta con una inscripción en el servicio', '5000', 'warning', 'top', 'center');
        }else{
          this.inscriptionService.post(ins).subscribe(sus => {
            switch (type) {
              case 'normal':
                this.postNotification(user.id, this.service.id,'te inscribiste en el servicio', 'service');
                this.router.navigate(['/customer/service/confirmation', this.service.id]);
                break;
              case 'auto':
                this.postNotification(user.id, this.service.id,'te inscribiste a la autoevaluacion', 'service');
                // this.managerService.getByUserId(user.id).subscribe((admin: any) => {
                //   const redirect = window.open("http://54.91.163.221/?userId="+user.id+"&adminId="+admin.id, "herbalife")
                // });
                const redirect = window.open("http://54.91.163.221/?userId="+user.id+"&adminId=123456789", "herbalife")
                break;
              case 'test':
                this.postNotification(user.id, this.service.id,'te inscribiste en el test', 'service');
                this.router.navigate(['/customer/test']);
                break;
              default:
                break;
            }
          }, error => {
            this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al acceder en el servicio, intente nuevamente', '5000', 'danger', 'top', 'center');
          });
        }
      })
    }, error => {
      this.showRegister();
    });
  }

  showRegister() {
    this.simpleModalService.addModal(RegisterModalComponent, {}, { closeOnClickOutside: true }).subscribe(data => {
      if (data) {
        location.reload();
      }
    });
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

}