import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routedComponents, BlogRoutingModule } from './blog.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [...routedComponents],
  imports: [
    RouterModule,
    BlogRoutingModule,
    CommonModule,
    NgbModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class BlogModule { }
