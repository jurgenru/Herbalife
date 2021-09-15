import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routedComponents, BlogStageRoutingModule } from './blog-stage.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [...routedComponents],
  imports: [
    RouterModule,
    BlogStageRoutingModule,
    CommonModule,
    NgbModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class BlogStageModule { }
