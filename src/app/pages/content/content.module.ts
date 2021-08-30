import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content.routing';
import { routedComponents } from '../content/content.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    ContentRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ContentModule { }
