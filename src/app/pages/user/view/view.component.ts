import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from "ngx-simple-modal";
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';
import { ContactFormComponent } from 'src/app/components/contact-form/contact-form.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  user: any;
  socialMedia: any = []

  constructor(
    private userService: UserService,
    private managerService: ManagerService,
    private SimpleModalService: SimpleModalService,
  ) { }

  ngOnInit() {
    this.me();
  }

  me() {
    this.userService.me().subscribe((me: any) => {
      this.managerService.getByUserId(me.id).subscribe((man: any) => {
        man.forEach(element => {
          this.user = element;
          this.socialMedia = JSON.parse(element.socialMedia);
        });
      });
    });
  }

  openSocialMedia(navUrl){
    window.open(navUrl, "_blank");
  }

  openContactForm(email){
    this.SimpleModalService.addModal(
      ContactFormComponent,
      {
        title: "Enviar Correo Electrónico",
        toEmail: email,
        name: this.user.names+ ' '+this.user.lastName,
      },
      { closeOnClickOutside: true }
    );
  }
}
