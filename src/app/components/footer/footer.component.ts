import { Component, OnInit } from "@angular/core";
import { SimpleModalService } from "ngx-simple-modal";
import { ScheduleCallComponent } from "../schedule-call/schedule-call.component";
import { ProfileService } from "src/app/services/profile.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  test: Date = new Date();
  user: any = {};

  constructor(
    private SimpleModalService: SimpleModalService,
    private profileService: ProfileService
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
    this.profileService.getByuserId(1).subscribe(res=>{
      this.user = res;
      console.log(this.user);
    })
  }
}
