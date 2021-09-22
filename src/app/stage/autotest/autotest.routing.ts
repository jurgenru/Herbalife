import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AutotestComponent } from "./autotest.component";
import { ViewComponent } from "./view/view.component";

const routes: Routes = [
  {
    path: "",
    component: AutotestComponent,
    children: [
      {
        path: "view",
        component: ViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutotestRoutingModule {}
export const routedComponents = [AutotestComponent, ViewComponent];
