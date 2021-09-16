import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InformationComponent } from "./information/information.component";
import { ListComponent } from "./list/list.component";
import { TrainerComponent } from "./trainer.component";
import { ViewComponent } from "./view/view.component";

const routes: Routes = [
  {
    path: "",
    component: TrainerComponent,
    children: [
      {
        path: "view/:id",
        component: ViewComponent,
      },
      {
        path:'information',
        component:InformationComponent
      },{
        path: 'list',
        component: ListComponent
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
  ListComponent
];
