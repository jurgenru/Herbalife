import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, TrainerRoutingModule } from './trainer.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [
    ...routedComponents
  ]
})
export class TrainerModule { }
