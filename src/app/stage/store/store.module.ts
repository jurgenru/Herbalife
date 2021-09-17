import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, StoreRoutingModule,  } from './store.routing';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
   routedComponents,],
  imports: [
    CommonModule,
    StoreRoutingModule,
    RouterModule,
    NgbModule,
    NgxUiLoaderModule
  ],
  exports: [
   routedComponents
  ],
})
export class StoreModule { }
