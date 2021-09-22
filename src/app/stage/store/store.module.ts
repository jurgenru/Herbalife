import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, StoreRoutingModule,  } from './store.routing';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
   routedComponents,
   CartComponent,],
  imports: [
    CommonModule,
    StoreRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule
  ],
  exports: [
   routedComponents
  ],
})
export class StoreModule { }
