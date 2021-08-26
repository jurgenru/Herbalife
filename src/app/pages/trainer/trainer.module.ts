import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, TrainerRoutingModule } from './trainer.routing';



@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    TrainerRoutingModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class TrainerModule { }
