import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule, routedComponents } from './blog.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleModalModule } from 'ngx-simple-modal';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    RouterModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SimpleModalModule,
    ImageCropperModule,
    NgxUiLoaderModule

  ],
  exports: [
    ...routedComponents
  ]
})
export class BlogModule { }
