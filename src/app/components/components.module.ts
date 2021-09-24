import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarHomeComponent } from "./navbar-home/navbar-home.component";
import { FloatSocialComponent } from "./float-social/float-social.component";
import { ImageCropperComponent } from "./image-cropper/image-cropper.component";
import { ImageCropperModule } from "ngx-image-cropper";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { SimpleModalModule } from "ngx-simple-modal";
import { ScheduleCallComponent } from './schedule-call/schedule-call.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, ImageCropperModule, ReactiveFormsModule, NgxUiLoaderModule, SimpleModalModule, FormsModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, NavbarHomeComponent, FloatSocialComponent, ImageCropperComponent, LoginComponent, RegisterComponent, ScheduleCallComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, NavbarHomeComponent, FloatSocialComponent, ImageCropperComponent, LoginComponent, RegisterComponent]
})
export class ComponentsModule { }
