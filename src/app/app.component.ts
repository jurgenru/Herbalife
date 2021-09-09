import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ManagerService } from "./services/manager.service";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private managerService: ManagerService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.session();
  }

  session() {
    const filter = `{"fields": {"role": true, "id": true}`;
    this.userService.me().subscribe((data: any) => {
      this.userService.getById(data.id, filter).subscribe((user: any) => {
        {
          if (user.role == 'admin') {
            this.managerService.getByUserId(user.id).subscribe(manager => {
              if (Object.keys(manager).length === 0) {
                this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Complete sus datos personales', '5000', 'warning', 'top', 'center');
                this.router.navigate(['/user/admin']);
              } else {
                this.router.navigate(['/dashboard']);
              }
            });
          }
        }
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
