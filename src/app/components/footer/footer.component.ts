import { Component, OnInit } from "@angular/core";
import { SimpleModalService } from "ngx-simple-modal";
import { ScheduleCallComponent } from "../schedule-call/schedule-call.component";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  test: Date = new Date();
  user: any;
  socialMedia: any;

  constructor(
    private SimpleModalService: SimpleModalService,
    private userService: UserService
    ) {}

  ngOnInit() {
    this.get();
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

  get(){
    this.userService.getManagerById(1).subscribe((data:any)=>{
      [data].map(element => {
        this.user = element;
        if(this.user.socialMedia){
          this.socialMedia = JSON.parse(element.socialMedia);
        }
      });
    })
  }
  openSocialMedia(navUrl){
    window.open(navUrl, "_blank");
  }
}
