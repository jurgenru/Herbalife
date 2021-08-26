import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { StoreComponent } from './store.component';
import { CreateComponent } from './create/create.component';
import { routedComponents } from './store.routing';
import { StoreListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    StoreComponent,
    CreateComponent,
    StoreListComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule

  ],
  exports: [
    StoreComponent,
    CreateComponent,
    StoreListComponent

]
})
export class StoreModule { }
