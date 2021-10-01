import { Component } from "@angular/core";
import { SimpleModalComponent, SimpleModalService } from "ngx-simple-modal";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user.service";
import { LoginModalComponent } from "../login-modal/login-modal.component";
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";

export interface AlertModel {
  token?: string;
}

@Component({
  selector: "app-register-modal",
  templateUrl: "register-modal.component.html",
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent extends SimpleModalComponent<AlertModel, null> implements AlertModel {

  token: string;

  constructor(
    private simpleModalService: SimpleModalService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private authService: SocialAuthService
  ) {
    super();
  }

  user = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

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

  register() {
    const start = new Date();
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
          this.result = log.token;
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha creado su usuario correctamente', '5000', 'success', 'top', 'center');
          this.close();
        }, elapsed);
      });
    });
  }

  login() {
    this.close();
    setTimeout(() => {
      this.simpleModalService.addModal(LoginModalComponent, {}, { closeOnClickOutside: true }).subscribe(data => {
        if (data) {
          location.reload();
        }
      });
    }, 500);
  }

  signInWithGoogle() {
    const start = new Date();
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
          const end = new Date();
          const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
          setTimeout(() => {
            this.result = log.token;
            localStorage.setItem('herTok', log.token);
          }, elapsed);
        });
      }, error => {
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>El correo ya ha sido registrado, intente con otro', '5000', 'danger', 'top', 'center');
      });
    }, error => {

    });
  }

}
