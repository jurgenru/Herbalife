import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, StoreRoutingModule,  } from './store.routing';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleModalModule } from 'ngx-simple-modal';
import { ComponentsModule } from 'src/app/components/components.module';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    ...routedComponents,
    OrderComponent,],
  imports: [
    RouterModule,
    StoreRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxUiLoaderModule,
    SimpleModalModule,
    ComponentsModule
  ],
  exports: [
  ...routedComponents
  ],
})
export class StoreModule { }
