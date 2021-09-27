import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { UserLayoutComponent } from "./layouts/user-layout/user-layout.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: 'home',
    pathMatch: "full",
  }, {
    path: 'register', component: RegisterComponent
  }, {
    path: 'login', component: LoginComponent
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }]
  }, {
    path: "",
    component: UserLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: "./layouts/user-layout/user-layout.module#UserLayoutModule"
      }
    ]
  }, {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
