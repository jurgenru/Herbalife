import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule, routedComponents } from './blog.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    RouterModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports: [
    ...routedComponents
  ]
})
export class BlogModule { }
