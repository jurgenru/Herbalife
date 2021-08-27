import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { StoreComponent } from './store.component';
import { CreateComponent } from './create/create.component';
import { routedComponents, StoreRoutingModule } from './store.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';

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
    StoreRoutingModule

  ],
  exports: [
    ...routedComponents
  ]
})
export class StoreModule { }
