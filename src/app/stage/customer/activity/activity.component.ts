import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ServiceService } from 'src/app/services/service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  inscriptions: any = [];
  index: number = 0;
  constructor(
    private userService: UserService,
    private serviceService: ServiceService,
    private spinner: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.getInscription();
  }
  getInscription() {
    var previousId = null;
    const start = new Date();
    this.spinner.start();
    const filter = `{"fields": {"id": true, "title": true, "image": true}}`;
    this.userService.me().subscribe((data: any) => {
      this.userService.getInscriptionById(data.id).subscribe((ins: any) => {
        ins.forEach(element => {
          this.serviceService.getById(element.serviceId, filter).subscribe(serviceData => {
            const end = new Date();
            const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
            setTimeout(() => {
              if (element.serviceId != previousId) {
                this.inscriptions[this.index] = serviceData;
                console.log(this.inscriptions[this.index]);
                this.index++;
                previousId = element.serviceId;
              }
              this.spinner.stop();
            }, elapsed);
            // if(element.serviceId != previousId){
            //   this.inscriptions[this.index]=serviceData;
            //   console.log(this.inscriptions[this.index]);
            //   this.index++;
            //   previousId = element.serviceId;
            // }
          });
        });
      });
    });
  }
}
