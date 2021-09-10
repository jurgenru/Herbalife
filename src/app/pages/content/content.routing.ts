import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{
  path: '',
  component: ContentComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'edit',
        component: EditComponent
      },
      {
        path: 'list',
        component: ListComponent
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
export const routedComponents = [
  ContentComponent,
  CreateComponent,
  EditComponent,
  ListComponent
];
