import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ServiceService } from 'src/app/services/service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LectionService } from 'src/app/services/lection.service';
import { ToastrService } from 'ngx-toastr';
import { ManagerService } from 'src/app/services/manager.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  inscriptions: any = [];
  lections: any = [];
  index: number = 0;
  indexlec: number = 0;
  bodyTest: any={};
  profile: any={};
  socialMedia: any;
  constructor(
    private userService: UserService,
    private serviceService: ServiceService,
    private spinner: NgxUiLoaderService,
    private lectionService: LectionService,
    private toastr: ToastrService,
    private managerService: ManagerService,
  ) { 
    this.getBodyComposition();
  }

  ngOnInit(): void {
   this.get();
  }
  
  get(){
    const start = new Date();
    this.spinner.start();
    const filter = `{"fields": {"id": true, "title": true, "image": true, "created": true}, "limit": 4 , "order":["created DESC"]}`;
    this.userService.me().subscribe((data: any) => {
      const end = new Date();
      const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
      setTimeout(() => {
        this.userService.getInscriptionById(data.id).subscribe((ins: any) => {
          if(ins.length>0){
            ins.forEach(element => {
              this.serviceService.getById(element.serviceId, filter).subscribe(serviceData => {
                this.inscriptions[this.index] = serviceData;
                this.index++;
              });
            });
          }
        });
        this.userService.getInscriptionLectionById(data.id).subscribe((lec:any)=>{
        if(lec.length > 0){
          lec.forEach(element => {
            this.lectionService.getById(element.lectionId).subscribe(lectionData =>{
              this.lections[this.indexlec] = lectionData;
              this.indexlec++;
            });
          });
        }
      })
        this.spinner.stop();
      }, elapsed);
    },error => {
      this.spinner.stop();
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al ver las actividades', '5000', 'danger', 'top', 'center');
    });
  }
  getBodyComposition(){
    this.userService.me().subscribe((user: any) => {
      const filter = `{"fields": {"id": true, "image": true, "phoneNumber": true}}`;
      this.userService.getById(user.id, filter).subscribe((us: any) => {
        this.userService.getProfileById(user.id).subscribe((prof: any) => {
        this.userService.getBodyCompositionById(user.id).subscribe( (body: any)=>{
          this.profile = prof;
          this.profile.email = us.email;
          this.profile.phoneNumber = us.phoneNumber;
          body.forEach(element => {
            this.bodyTest=element;
            console.log(this.bodyTest);
          });
        }); 
      });
      });
    });
  }
  generatePdf() {
    const options = {
        filename: 'test-corporal.pdf',
        image: { type: 'jpeg',quality:0.98  },
        html2canvas: {
            scale: 2
        },
        jsPDF: { orientation: 'portrait' }
    };
    const content: Element = document.getElementById('bodytest')
    html2pdf()
        .from(content)
        .set(options)
        .save();
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
