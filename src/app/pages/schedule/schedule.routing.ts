import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { EditComponent } from "./edit/edit.component";
import { ViewComponent } from "./view/view.component";
import { ScheduleComponent } from "./schedule.component";

const routes: Routes = [
  {
    path: "",
    component: ScheduleComponent,
    children: [
      {
        path: "list",
        component: ListComponent,
      },
      {
        path: "view/:id",
        component: ViewComponent,
      },
      {
        path: "edit/:id",
        component: EditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
export const routedComponents = [
  ScheduleComponent,
  ListComponent,
  EditComponent,
  ViewComponent,
];
