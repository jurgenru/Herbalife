import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routedComponents, BlogRoutingModule } from './blog.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [...routedComponents],
  imports: [
    RouterModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule,
    CommonModule,
    NgbModule,
    NgxUiLoaderModule,
    MomentModule,
    ComponentsModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class BlogModule { }
