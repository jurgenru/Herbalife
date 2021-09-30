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
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { SimpleModalModule } from "ngx-simple-modal";
import { ScheduleCallComponent } from "./schedule-call/schedule-call.component";
import { RegisterModalComponent } from "./register-modal/register-modal.component";
import { LoginModalComponent } from "./login-modal/login-modal.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MomentModule } from "angular2-moment";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ImageCropperModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    SimpleModalModule,
    FormsModule,
    BrowserModule,
    MomentModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NavbarHomeComponent,
    FloatSocialComponent,
    ImageCropperComponent,
    ScheduleCallComponent,
    RegisterModalComponent,
    LoginModalComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NavbarHomeComponent,
    FloatSocialComponent,
    ImageCropperComponent,
    ScheduleCallComponent,
    RegisterModalComponent,
    LoginModalComponent
  ]
})
export class ComponentsModule {}
