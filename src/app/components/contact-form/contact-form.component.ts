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
  blog: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) {
    super();

    this.blog = this.formBuilder.group({
      email: ['', Validators.required],
      issue: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  confirm() {
    this.close();
  }

  ngOnInit(): void {
  }

  appointment = this.formBuilder.group({
    names: ["", Validators.required],
    phoneNumber: [
      "",
      [Validators.required, Validators.pattern("[0-9]{3}[0-9]{2}[0-9]{3}")],
    ],
    email: ["", [Validators.required, Validators.email]],
    // type: [""],
    hour: [""],
    schedule: [""],
  });

  notification(content, time, type, from, align) {
    this.toastr.error(content, "", {
      timeOut: time,
      closeButton: true,
      enableHtml: true,
      toastClass: `alert alert-${type} alert-with-icon`,
      positionClass: "toast-" + from + "-" + align,
    });
  }

  get nameField() {
    return this.appointment.get("names");
  }

  get cellphoneField() {
    return this.appointment.get("phoneNumber");
  }

  get emailField() {
    return this.appointment.get("email");
  }
}
