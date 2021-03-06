import { Component, OnInit } from "@angular/core";
import { SimpleModalService } from "ngx-simple-modal";
import { ScheduleCallComponent } from "../schedule-call/schedule-call.component";
import { UserService } from "src/app/services/user.service";
import { ContactFormComponent } from "../contact-form/contact-form.component";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  test: Date = new Date();
  user: any;
  socialMedia: any;
  numberPhone: any;

  lat = 51.678418;
  lng = 7.809007;
  zoom: number = 16;

  constructor(
    private SimpleModalService: SimpleModalService,
    private userService: UserService
  ) { 
    // this.get();
  }

  ngOnInit() {
  }

  callSchedule() {
    this.SimpleModalService.addModal(
      ScheduleCallComponent,
      {
        title: "Programa tu consulta",
      },
      { closeOnClickOutside: true }
    );
  }

  contactForm() {
    this.SimpleModalService.addModal(
      ContactFormComponent,
      {
        title: "Enviar Correo Electrónico",
        toEmail: this.socialMedia.email,
        name: this.user.names + ' ' + this.user.lastName,
      },
      { closeOnClickOutside: true }
    );
  }

  // get() {
  //   this.userService.getManagerById("1").subscribe((data: any) => {
  //     data.forEach(element => {
  //       if (element.socialMedia) {
  //         this.socialMedia = JSON.parse(element.socialMedia);
  //         this.numberPhone = this.socialMedia.whatsapp.split('/')
  //       }
          
  //     });
  //   });
  // }

  openSocialMedia(navUrl) {
    window.open(navUrl, "_blank");
  }
}
