import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RegisterModalComponent } from 'src/app/components/register-modal/register-modal.component';
import { InscriptionLection } from 'src/app/services/inscription-lection';
import { NotificationService } from 'src/app/services/notification.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  trainer: any = {};
  lection: any = {};
  socialMedia: any = { };

  constructor(
    private route: ActivatedRoute,
    private trainerService: TrainerService,
    private spinner: NgxUiLoaderService,
    private router: Router,
    private inscriptionLectionService: InscriptionLection,
    private userService: UserService,
    private simpleModalService: SimpleModalService,
    private notificationService: NotificationService
  ) {
    this.get();
  }

  ngOnInit() {
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

  registerClass() {
    this.userService.me().subscribe((user: any) => {
    const ins = {
      lectionId: this.trainer.id,
      userId: (user.id).toString(),
    }
    this.inscriptionLectionService.post(ins).subscribe(inscrip => {
      this.postNotification(user.id, this.trainer.id, 'Te inscribiste en una clase', 'lection');
      switch (this.lection.mode) {
        case 'presencial':
          this.router.navigate(['/customer/trainer/information']);
          
          break;
        case 'virtual':
  
        break;
      
        default:
          break;
      }
    });
  }, error => {
    this.showRegister();
  });
  }

  socialUrl(data){
    return window.open(data, "_blank");
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


  showRegister() {
    this.simpleModalService.addModal(RegisterModalComponent, {}, { closeOnClickOutside: true }).subscribe(data => {
      if (data) {
        location.reload();
      }
    });
  }
}