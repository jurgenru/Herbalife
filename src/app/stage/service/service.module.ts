import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routedComponents, ServiceRoutingModule } from './service.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [...routedComponents],
  imports: [
    RouterModule,
    ComponentsModule,
    ServiceRoutingModule,
    CommonModule,
    NgbModule,
    NgxUiLoaderModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class ServiceModule { }
