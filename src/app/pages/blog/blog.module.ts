import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule, routedComponents } from './blog.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleModalModule } from 'ngx-simple-modal';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    RouterModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SimpleModalModule,
    ImageCropperModule

  ],
  exports: [
    ...routedComponents
  ]
})
export class BlogModule { }
