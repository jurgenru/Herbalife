import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import * as html2pdf from 'html2pdf.js';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  profile: any = {};
  bodyTest: any = {};
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private spinner: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.get();
  }
  get() {
    const filter = `{"fields": {"id": true, "image": true, "phoneNumber": true}}`;
    this.route.params.subscribe(val => {
      this.userService.getById(val.id, filter).subscribe((us: any) => {
        this.userService.getProfileById(val.id).subscribe((prof: any) => {
          this.userService.getBodyCompositionById(val.id).subscribe((body: any) => {
            this.profile = prof;
            this.profile.email = us.email;
            this.profile.phoneNumber = us.phoneNumber;
            console.log(this.profile);
            body.forEach(element => {
              this.bodyTest = element;
              console.log(this.bodyTest);
            }, error => {
              this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un error al cargar los resultados', '5000', 'danger', 'top', 'center');
            });
          });
        });
      });
    });
  }
  generatePdf() {
    this.spinner.start();
    setTimeout(()=>{
      const options = {
        filename: 'test-corporal.pdf',
        image: { type: 'jpeg', quality: 0.98 },
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
        this.spinner.stop()
        setTimeout(()=>{
          window.close();
        },5000);
    },3500);
  
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
