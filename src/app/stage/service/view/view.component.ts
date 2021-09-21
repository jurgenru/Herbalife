import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ServiceService } from 'src/app/services/service.service';

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
    private spinner: NgxUiLoaderService,
    private router: Router
  ) {
    this.get();
    this.list();
  }

  ngOnInit() { }

  get() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.serviceService.getById(val.id).subscribe(ser => {
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

  viewService(id){
    this.router.navigate(['/customer/service/view', id]);
    setTimeout(() => {
      location.reload();
    }, 50);
  }
}