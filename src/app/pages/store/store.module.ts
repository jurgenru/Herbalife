import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { routedComponents, StoreRoutingModule } from './store.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SimpleModalModule } from 'ngx-simple-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ...routedComponents
  ],
  imports: [
    RouterModule,
    StoreRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    StoreRoutingModule,
    SimpleModalModule,
    ImageCropperModule,
    NgbModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class StoreModule { }
