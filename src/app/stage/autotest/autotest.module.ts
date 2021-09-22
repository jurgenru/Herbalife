import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routedComponents, AutotestRoutingModule } from './autotest.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [routedComponents],
  imports: [
    CommonModule,
    AutotestRoutingModule,
    NgbModule,
    NgxUiLoaderModule,
    RouterModule
  ],
  exports: [routedComponents]
})
export class AutotestModule { }
