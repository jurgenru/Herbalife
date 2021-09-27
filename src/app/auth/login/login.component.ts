import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SimpleModalComponent } from "ngx-simple-modal";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { UserService } from "src/app/services/user.service";

export interface AlertModel {
  title?: string;
  message: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends SimpleModalComponent<AlertModel, null> implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxUiLoaderService,
    private userService: UserService,
    private toastr: ToastrService) { 
      super();
    }

  ngOnInit() {
  }

  user = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  login() {
    const start = new Date();
    this.spinner.start();
    this.userService.login(this.user.value).subscribe((data: any) => {
      const end = new Date();
      const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
      switch (data.user.role) {
        case 'customer':
          localStorage.setItem('herTok', data.token);
          setTimeout(() => {
            this.router.navigate(['/customer/view']);
            this.spinner.stop();
          }, elapsed);
          break;
        case 'admin':
          localStorage.setItem('herTok', data.token);
          setTimeout(() => {
            this.router.navigate(['/home']);
            this.isLogged();
            this.spinner.stop();
          }, elapsed);
          break;
        default:
          break;
      }
    }, error => {
      this.spinner.stop();
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> El correo electronico y/o contraseña con incorrectas , intente nuevamente', '5000', 'danger', 'top', 'center');
    });
  }

  get email() {
    return this.user.get('email');
  }

  get password() {
    return this.user.get('password');
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

  isLogged() {
      this.userService.me().subscribe((us: any) => {
           const filter = `{"fields": {"id": true}}`;
           this.userService.getById(us.id, filter).subscribe((admin: any) => {
               if(admin.role == 'admin'){
                localStorage.setItem('currentUser', "loggedin");
                   return true;
               }
           });
       });
     }
}