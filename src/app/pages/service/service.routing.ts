import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { ServiceComponent } from "./service.component";
import { ViewComponent } from "./view/view.component";

const routes: Routes = [
  {
    path: "",
    component: ServiceComponent,
    children: [
      {
        path: "create",
        component: CreateComponent,
      },
      {
        path: "edit",
        component: EditComponent,
      },
      {
        path: "list",
        component: ListComponent,
      },
      {
        path: "view/:id",
        component: ViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
export const routedComponents = [
  ServiceComponent,
  CreateComponent,
  EditComponent,
  ListComponent,
  ViewComponent
];
