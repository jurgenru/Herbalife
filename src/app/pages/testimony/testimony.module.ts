import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestimonyRoutingModule } from './testimony.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routedComponents } from '../testimony/testimony.routing';
import { SimpleModalModule } from 'ngx-simple-modal';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    TestimonyRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleModalModule,
    ImageCropperModule
  ]
})
export class TestimonyModule { }
