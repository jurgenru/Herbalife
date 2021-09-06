import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService) {}

  ngOnInit() {
  }

  user = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  login() {
    this.userService.login(this.user.value).subscribe((data: any) => {
      localStorage.setItem('herTok', data.token);
      this.router.navigate(['/dashboard']);
    }, error => {
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
      positionClass: 'toast-' + from + '-' +  align
    });
  }

}
