import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { routedComponents, routes, StoreStageRoutingModule } from './store-stage.routing';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
   routedComponents,],
  imports: [
    CommonModule,
    StoreStageRoutingModule,
    RouterModule,
    NgbModule,
  ],
  exports: [
   routedComponents
  ],
})
export class StoreStageModule { }
