import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { StoreComponent } from './store.component';
import { CreateComponent } from './create/create.component';
import { routedComponents } from './store.routing';
import { StoreListComponent } from './store-list/store-list.component';

@NgModule({
  declarations: [
    StoreComponent,
    CreateComponent,
    StoreListComponent
  ],
  imports: [
    RouterModule,

  ],
  exports: [
    StoreComponent,
    CreateComponent,
    StoreListComponent

]
})
export class StoreModule { }
