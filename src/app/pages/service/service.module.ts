import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routedComponents } from '../user/user.routing';
import { ServiceRoutingModule } from './service.routing';


@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class ServiceModule { }
