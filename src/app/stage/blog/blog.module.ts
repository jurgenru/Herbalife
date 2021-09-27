import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routedComponents, BlogRoutingModule } from './blog.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [...routedComponents],
  imports: [
    RouterModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgbModule,
    NgxUiLoaderModule,
    MomentModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class BlogModule { }
