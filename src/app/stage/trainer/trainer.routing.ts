import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InformationComponent } from "./information/information.component";
import { TrainerComponent } from "./trainer.component";
import { ViewComponent } from "./view/view.component";

const routes: Routes = [
  {
    path: "",
    component: TrainerComponent,
    children: [
      {
        path: "view",
        component: ViewComponent,
      },
      {
        path:'information',
        component:InformationComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainerRoutingModule {}

export const routedComponents = [
  TrainerComponent,
  ViewComponent,
  InformationComponent,
];
