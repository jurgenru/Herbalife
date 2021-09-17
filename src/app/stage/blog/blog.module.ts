import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routedComponents, BlogRoutingModule } from './blog.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [...routedComponents],
  imports: [
    RouterModule,
    BlogRoutingModule,
    CommonModule,
    NgbModule,
    NgxUiLoaderModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class BlogModule { }
