import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: FormGroup;

  constructor() {}

  ngOnInit() {
    this.form();
  }

  form() {
    this.user = new FormGroup({
      email: new FormControl('',Validators.required),

      password : new FormControl('', Validators.required)
    });
  }

  login() {
    console.log(this.user);
  }
}
