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

  ngOnInit() { }

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

  registerServiceNormal() {
    this.userService.me().subscribe((user: any) => {
      const ins = {
        userId: user.id,
        serviceId: this.service.id
      }
      this.inscriptionService.post(ins).subscribe(sus => {
        this.postNotification(user.id, this.service.id,'te inscribiste el en servicio', 'service');
        this.router.navigate(['/customer/service/confirmation', this.service.id]);
      }, error => {
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al acceder al servicio, intente nuevamente', '5000', 'danger', 'top', 'center');
      });
    }, error => {
      this.showRegister();
    });
  }

  registerServiceTest() {
    this.userService.me().subscribe((user: any) => {
      const ins = {
        userId: (user.id).toString(),
        serviceId: this.service.id
      }
      this.inscriptionService.post(ins).subscribe(sus => {
        this.postNotification(user.id, this.service.id,'te inscribiste en el test', 'service');
        this.router.navigate(['/customer/test']);
      }, error => {
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al acceder al servicio, intente nuevamente', '5000', 'danger', 'top', 'center');
      });
    }, error => {
      this.showRegister();
    });
  }

  registerServiceAuto() {
    this.userService.me().subscribe((user: any) => {
      const ins = {
        userId: (user.id).toString(),
        serviceId: this.service.id
      }
      this.inscriptionService.post(ins).subscribe(sus => {
        this.postNotification(user.id, this.service.id,'te inscribiste a la autoevaluacion', 'service');
        // this.managerService.getByUserId(user.id).subscribe((admin: any) => {
        //   const redirect = window.open("http://54.91.163.221/?userId="+user.id+"&adminId="+admin.id, "herbalife")
        // });
       const redirect = window.open("http://54.91.163.221/?userId="+user.id+"&adminId=123456789", "herbalife")
      }, error => {
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al acceder al servicio, intente nuevamente', '5000', 'danger', 'top', 'center');
      });
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