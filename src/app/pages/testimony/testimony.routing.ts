import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { TestimonyComponent } from "./testimony.component";
import { ViewComponent } from "./view/view.component";

const routes: Routes = [
  {
    path: "",
    component: TestimonyComponent,
    children: [
      {
        path: "create",
        component: CreateComponent,
      },
      {
        path: "list",
        component: ListComponent,
      },
      {
        path: "view/:id",
        component: ViewComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestimonyRoutingModule {}
export const routedComponents = [
  TestimonyComponent,
  CreateComponent,
  EditComponent,
  ListComponent,
  ViewComponent,
];
