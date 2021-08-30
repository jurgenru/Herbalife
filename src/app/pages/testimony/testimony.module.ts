import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestimonyRoutingModule } from './testimony.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routedComponents } from '../testimony/testimony.routing';

@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    TestimonyRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TestimonyModule { }
