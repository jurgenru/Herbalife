import { Component, OnInit } from "@angular/core";
import { SimpleModalService } from "ngx-simple-modal";
import { ScheduleCallComponent } from "../schedule-call/schedule-call.component";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  test: Date = new Date();

  constructor(private SimpleModalService: SimpleModalService) {}

  ngOnInit() {}

  callSchedule() {
    let schedule = this.SimpleModalService.addModal(ScheduleCallComponent, {
      title:'COnfirm title',
      message:'confirm message'
    }).subscribe((isConfirmed)=>{
      if(isConfirmed){
        alert('accepted')
      }else{
        alert('declined')
      }
    });
    setTimeout(()=>{
      schedule.unsubscribe();
    }, 10000);
  }
}
