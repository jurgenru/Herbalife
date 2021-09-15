import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-register",
  templateUrl: "register.component.html",
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private spinner: NgxUiLoaderService,
    private toastr: ToastrService
  ) { }

  ngOnInit() { }

  user = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  register() {
    const start = new Date();
    this.spinner.start();
    this.userService.register(this.user.value).subscribe((data: any) => {
      const login = {
        email: data.email,
        password: this.user.value.password
      }
      this.userService.login(login).subscribe((data: any) => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          switch (data.user.role) {
            case 'partern':
              this.spinner.stop();
              break;
            case 'customer':
              this.spinner.stop();
              localStorage.setItem('herTok', data.user.token);
              this.router.navigate(['/customer/create']);
              this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha creado su usuario correctamente, complete su perfil ahora', '5000', 'success', 'top', 'center');
              break;
            default:
              break;
          }
        }, elapsed);
        //   const end = new Date();
        //   const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        //   this.spinner.stop();
        //   setTimeout(() => {
        //     localStorage.setItem('herTok', user.token);
        //     this.router.navigate(['/page/admin']);
        //     this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha creado sus usuario correctamente', '5000', 'success', 'top', 'center');
        //   }, elapsed);
        // }, error => {
        //   this.spinner.stop();
        //   this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> No pudo crear su usuario, intente nuevamente', '5000', 'danger', 'top', 'center');
      });
    });
  }

  get email() {
    return this.user.get('email');
  }

  get username() {
    return this.user.get('username');
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

}
