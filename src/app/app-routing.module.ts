import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { UserLayoutComponent } from "./layouts/user-layout/user-layout.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: 'login',
    pathMatch: "full"
  },{
    path: 'register', component: RegisterComponent
  }, {
    path: 'login', component: LoginComponent
  }, {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }]}, {
        path: "",
        component: UserLayoutComponent,
        children: [
          {
            path: "",
            loadChildren: "./layouts/user-layout/user-layout.module#UserLayoutModule"
          }
        ]
      },{
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
