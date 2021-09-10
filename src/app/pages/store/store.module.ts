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
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    ...routedComponents,
    FilterStorePipe,
    EditComponent
  ],
  imports: [
    RouterModule,
    StoreRoutingModule,
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
    ...routedComponents
  ]
})
export class StoreModule { }
