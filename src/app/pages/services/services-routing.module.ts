import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './create/services.component';
import { ServiceListComponent } from './service-list/service-list.component';

const routes: Routes = [{
  path: '',
    children: [
      {
        path: 'create',
        component: ServicesComponent
      },
      {
        path: 'list',
        component: ServiceListComponent
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
