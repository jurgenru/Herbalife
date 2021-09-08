import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { routedComponents, StoreRoutingModule } from './store.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SimpleModalModule } from 'ngx-simple-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterStorePipe } from 'src/app/pipes/filter-store.pipe';

@NgModule({
  declarations: [
    ...routedComponents,
    FilterStorePipe
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
    NgbModule,
    NgxPaginationModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class StoreModule { }
