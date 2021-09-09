import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [{
      path: 'create',
      component: CreateComponent
    }, {
      path: 'view/:id',
      component: ViewComponent
    }, {
      path: 'edit/:id',
      component: EditComponent
    }, {
      path: 'list',
      component: ListComponent
    }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
export const routedComponents = [
  BlogComponent,
  CreateComponent,
  EditComponent,
  ViewComponent,
  ListComponent
];