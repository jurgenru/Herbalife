import { Routes } from "@angular/router";
import { HomeComponent } from "src/app/pages/home/home.component";

export const UserLayoutRoutes: Routes = [
  {
    path: 'page/:name', component: HomeComponent
  },
  {
    path: 'customer',
    children: [{
      path: 'blog',
      loadChildren: '../../stages/blog/blog.module#BlogModule'
    }]
  },
  {
    path: 'page/:name', component: HomeComponent
  }, {
    path: '',
    children: [{
      path: 'customer',
      loadChildren: '../../stage/customer/customer.module#CustomerModule'
    }]
  }
]