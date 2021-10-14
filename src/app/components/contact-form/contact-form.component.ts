import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { SimpleModalComponent } from "ngx-simple-modal";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

export interface AlertModel {
  title: string;
}
@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.css"],
})
export class ContactFormComponent
  extends SimpleModalComponent<AlertModel, null>
  implements AlertModel
{
  typeForm: FormGroup;
  title: string;
  formData: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) {
    super();
  }
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.formData = this.formBuilder.group({
      email: ['', Validators.required],
      issue: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  send(){
    console.log('contact', this.formData.value);
    emailjs.send('service_0pkzh6h', 'template_gbpktuf', this.formData.value, 'user_MfFadQtzejSZwASPeldba')
    .then((result: EmailJSResponseStatus) => {
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se ha enviado su correo', '5000', 'success', 'top', 'center');
      console.log('result', result.text);
    }, (error) => {
      this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Hubo un al enviar correo, intente nuevamente', '5000', 'danger', 'top', 'center');
      console.log('error', error.text);
    });
    this.close();
  }

  notification(content, time, type, from, align) {
    this.toastr.error(content, "", {
      timeOut: time,
      closeButton: true,
      enableHtml: true,
      toastClass: `alert alert-${type} alert-with-icon`,
      positionClass: "toast-" + from + "-" + align,
    });
  }
}
