import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { SimpleModalComponent, SimpleModalService } from "ngx-simple-modal";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { UserService } from "src/app/services/user.service";
import { RegisterModalComponent } from "../register-modal/register-modal.component";

export interface AlertModel {
  token?: string;
}

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent extends SimpleModalComponent<AlertModel, null> implements OnInit {

  constructor(
    private simpleModalService: SimpleModalService,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private authService: SocialAuthService) {
    super();
  }

  ngOnInit() {}

  user = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  login() {
    const start = new Date();
    this.userService.login(this.user.value).subscribe((data: any) => {
      const end = new Date();
      const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
      setTimeout(() => {
        this.close();
        this.result = data.token;
        localStorage.setItem('herTok', data.token);
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha iniciado session correctamente', '5000', 'success', 'top', 'center');
        location.reload;
      }, elapsed);
    }, error => {
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> El correo electronico y/o contraseña con incorrectas , intente nuevamente', '5000', 'danger', 'top', 'center');
    });
  }

  register() {
    this.close();
    setTimeout(() => {
      this.simpleModalService.addModal(RegisterModalComponent, {}, { closeOnClickOutside: true }).subscribe(data => {
      });
    }, 500);
  }

  get email() {
    return this.user.get('email');
  }

  get password() {
    return this.user.get('password');
  }

  logInWithGoogle() {
    const start = new Date();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      console.log(data);
      const log = {
        email: data.email,
        password: data.id
      }
      this.userService.login(log).subscribe((log: any) => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.close();
          this.result = log.token;
          localStorage.setItem('herTok', log.token);
          this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha iniciado session correctamente', '5000', 'success', 'top', 'center');
          location.reload;
        }, elapsed);
      }, error => {
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>La cuenta no ha sido encontrada, intente con otro', '5000', 'danger', 'top', 'center');
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