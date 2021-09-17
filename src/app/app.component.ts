import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ManagerService } from "./services/manager.service";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private managerService: ManagerService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxUiLoaderService,
  ) {
    // this.session();
  }

  session() {
    const start = new Date();
    this.spinner.start();
    const filter = `{"fields": {"role": true, "id": true}`;
    this.userService.me().subscribe((data: any) => {
      // this.userService.getById(data.id, filter).subscribe((user: any) => {
      // });
    }, error => {
      this.spinner.stop();
      this.router.navigate(['/']);
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
