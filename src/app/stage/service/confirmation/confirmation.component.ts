import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements OnInit {

  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';
  service: any;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private spinner: NgxUiLoaderService,
  ) {
    this.get();
  }

  ngOnInit() { }

  get() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
    const filter = `{"fields": {"id": true, "descriptionGratitude": true, "titleGratitude": true}}`;
      this.serviceService.getById(val.id, filter).subscribe(ser => {
        const end = new Date();
        const elapsed = ((end.getSeconds() - start.getSeconds()) * 1000);
        setTimeout(() => {
          this.service = ser;
          this.spinner.stop();
        }, elapsed);
      });
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