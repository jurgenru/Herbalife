import { Routes } from "@angular/router";
import { HomeComponent } from "src/app/pages/home/home.component";

export const UserLayoutRoutes: Routes = [
  {
    path: 'page/:name', component: HomeComponent
  },
  {
    path: '',
    children: [{
      path: 'blog-stage',
      loadChildren: '../../stages/blog-stage/blog-stage.module#BlogStageModule'
    }]
  },
]