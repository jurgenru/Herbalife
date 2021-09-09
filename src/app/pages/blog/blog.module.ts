import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { BlogRoutingModule, routedComponents } from './blog.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SimpleModalModule } from 'ngx-simple-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterBlogPipe } from 'src/app/pipes/filter-blog.pipe';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
  declarations: [
    ...routedComponents,
    FilterBlogPipe
  ],
  imports: [
    RouterModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SimpleModalModule,
    ImageCropperModule,
    NgbModule,
    NgxPaginationModule,
    NgxUiLoaderModule,
  ],
  exports: [
    ...routedComponents,
  ]
})
export class BlogModule { }
