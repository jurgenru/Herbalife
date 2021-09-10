import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routedComponents } from '../service/service.routing';
import { ServiceRoutingModule } from './service.routing';
import { SimpleModalModule } from 'ngx-simple-modal';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterServicePipe } from 'src/app/pipes/filter-service.pipe';


@NgModule({
  declarations: [...routedComponents, FilterServicePipe],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SimpleModalModule,
    ImageCropperModule,
    NgxUiLoaderModule,
    NgxPaginationModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class ServiceModule { }
