import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routedComponents, TrainerRoutingModule } from "./trainer.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ImageCropperModule } from "ngx-image-cropper";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { SimpleModalModule } from "ngx-simple-modal";

@NgModule({
  declarations: [routedComponents],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule,
    SimpleModalModule,
    FormsModule,
    CommonModule,
    NgbModule,
    NgxUiLoaderModule,
  ],
  exports: [routedComponents],
})
export class TrainerModule {}
