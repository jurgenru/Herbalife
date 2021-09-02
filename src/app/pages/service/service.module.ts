import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routedComponents } from '../service/service.routing';
import { ServiceRoutingModule } from './service.routing';
import { SimpleModalModule } from 'ngx-simple-modal';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SimpleModalModule,
    ImageCropperModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class ServiceModule { }
