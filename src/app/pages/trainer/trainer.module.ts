import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, TrainerRoutingModule } from './trainer.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SimpleModalModule } from 'ngx-simple-modal';



@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ImageCropperModule,
    SimpleModalModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class TrainerModule { }
