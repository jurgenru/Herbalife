import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SocialAuthService } from "angularx-social-login";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { UserService } from "src/app/services/user.service";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

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
    private toastr: ToastrService,
    private authService: SocialAuthService
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
    this.user.value.phoneNumber = this.user.value.password;
    this.userService.register(this.user.value).subscribe((data: any) => {
      const login = {
        email: data.email,
        password: this.user.value.password
      }
      this.userService.login(login).subscribe((log: any) => {
        localStorage.setItem('herTok', log.token);
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          switch (log.user.role) {
            case 'customer':
              this.router.navigate(['/customer/create']);
              this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha creado su usuario correctamente, complete su perfil ahora', '5000', 'success', 'top', 'center');
              this.spinner.stop();
              break;
            default:
              break;
          }
        }, elapsed);
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

  signInWithGoogle() {
    const start = new Date();
    this.spinner.start();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      const user = {
        email: data.email,
        username: (data.firstName.substr(0,7)).toLowerCase(),
        password: data.id
      }
      this.userService.registerWithGoogle(user).subscribe((user: any) => {
        const log = {
          email: data.email,
          password: data.id
        }
        this.userService.login(log).subscribe((log: any) => {
          localStorage.setItem('herTok', log.token);
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
            switch (log.user.role) {
              case 'customer':
                this.router.navigate(['/customer/create']);
                this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha creado su usuario correctamente, complete su perfil ahora', '5000', 'success', 'top', 'center');
                this.spinner.stop();
                break;
              default:
                break;
            }
          }, elapsed);
        });
      }, error => {
        this.spinner.stop();
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>El correo ya ha sido registrado, intente con otro', '5000', 'danger', 'top', 'center');
      });
    }, error => {
      this.spinner.stop();

    });
  }

  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
    });
  }

  signOut(): void {
    this.authService.signOut();
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
