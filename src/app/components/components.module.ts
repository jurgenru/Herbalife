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

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, ImageCropperModule,],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, NavbarHomeComponent, FloatSocialComponent, ImageCropperComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, NavbarHomeComponent, FloatSocialComponent, ImageCropperComponent]
})
export class ComponentsModule { }
