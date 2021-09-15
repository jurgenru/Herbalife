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
]