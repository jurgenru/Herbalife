import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbDropdown, NgbDropdownModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";

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
import { ShareButtonComponent } from "./share-button/share-button.component";
import { FormUploadComponent } from './form-upload/form-upload.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MomentModule } from "angular2-moment";
import { VirtualCardComponent } from './virtual-card/virtual-card.component';

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
    MomentModule,
    NgbDropdownModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NavbarHomeComponent,
    FloatSocialComponent,
    ImageCropperComponent,
    ScheduleCallComponent,
    ShareButtonComponent,
    FormUploadComponent,
    VirtualCardComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NavbarHomeComponent,
    FloatSocialComponent,
    ImageCropperComponent,
    ScheduleCallComponent,
    ShareButtonComponent,
    FormUploadComponent,
    VirtualCardComponent
  ]
})
export class ComponentsModule {}
