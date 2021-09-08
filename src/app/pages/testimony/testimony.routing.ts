import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { TestimonyComponent } from "./testimony.component";

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
        path: "edit",
        component: EditComponent,
      },
      {
        path: "list",
        component: ListComponent,
      },
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
];
