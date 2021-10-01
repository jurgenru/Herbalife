import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SimpleModalModule } from 'ngx-simple-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { OrderRoutingModule, routedComponents } from './order.routing';
import { FilterOrderPipe } from 'src/app/pipes/filter-order.pipe';


@NgModule({
  declarations: [
    ...routedComponents,
    FilterOrderPipe
  ],
  imports: [
    RouterModule,
    OrderRoutingModule,
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
export class OrderModule { }
