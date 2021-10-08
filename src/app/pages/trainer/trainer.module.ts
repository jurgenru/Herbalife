import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { routedComponents, TrainerRoutingModule } from './trainer.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SimpleModalModule } from 'ngx-simple-modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FilterTrainerPipe } from 'src/app/pipes/filter-trainer.pipe';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [...routedComponents, FilterTrainerPipe],
  imports: [
    RouterModule,
    TrainerRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ImageCropperModule,
    SimpleModalModule,
    NgbModule,
    NgxPaginationModule,
    NgxUiLoaderModule,
    ComponentsModule,
  ],
  exports: [
    ...routedComponents
  ]
})
export class TrainerModule { }
