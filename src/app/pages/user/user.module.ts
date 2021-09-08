import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule, routedComponents } from './user.routing';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    FormsModule,
    ImageCropperModule,
    SimpleModalModule,
    NgxUiLoaderModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class UserModule { }
