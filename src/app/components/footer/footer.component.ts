import { Component, OnInit } from "@angular/core";
import { SimpleModalService } from "ngx-simple-modal";
import { ScheduleCallComponent } from "../schedule-call/schedule-call.component";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  test: Date = new Date();

  constructor(private SimpleModalService: SimpleModalService) {}

  ngOnInit() {}

  callSchedule() {
    this.SimpleModalService.addModal(
      ScheduleCallComponent,
      {
        title: "Programa tu consulta",
      },
      { closeOnClickOutside: true }
    );
  }
}
