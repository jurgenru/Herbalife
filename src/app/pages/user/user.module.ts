import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule, routedComponents } from './user.routing';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    UserRoutingModule,
    ImageCropperModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class UserModule { }
