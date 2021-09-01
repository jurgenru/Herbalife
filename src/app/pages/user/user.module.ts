import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule, routedComponents } from './user.routing';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SimpleModalModule } from 'ngx-simple-modal';

@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    UserRoutingModule,
    ImageCropperModule,
    SimpleModalModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class UserModule { }
