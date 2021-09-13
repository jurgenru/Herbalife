import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ServiceService } from "src/app/services/service.service";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
})

export class ViewComponent implements OnInit {

  service: any = {};

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService
  ) {
    this.route.params.subscribe((val) => {
      this.serviceService.getById(val.id).subscribe(data => {
        this.service = data;
      })
    });
  }

  ngOnInit() {}
}
