import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private serviceService: ServiceService
  ) {
    this.get();
  }

  ngOnInit() { }

  get() {
    this.route.params.subscribe(val => {
    const filter = `{"fields": {"id": true, "descriptionGratitude": true, "titleGratitude": true}}`;
      this.serviceService.getById(val.id, filter).subscribe(ser => {
        console.log(ser);
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