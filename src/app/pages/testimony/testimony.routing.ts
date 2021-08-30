import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { TestimonyComponent } from './testimony.component';

const routes: Routes = [{
  path: '',
  component: TestimonyComponent,
  children: [
    {
      path: 'create',
      component: CreateComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestimonyRoutingModule { }
export const routedComponents = [
  TestimonyComponent,
  CreateComponent
];
