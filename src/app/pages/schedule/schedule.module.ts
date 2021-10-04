import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SimpleModalModule } from 'ngx-simple-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { routedComponents, ScheduleRoutingModule } from './schedule.routing';


@NgModule({
  declarations: [
    ...routedComponents
  ],
  imports: [
    RouterModule,
    ScheduleRoutingModule,
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
export class ScheduleModule { }
