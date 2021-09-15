import { Routes } from "@angular/router";
import { HomeComponent } from "src/app/pages/home/home.component";

export const UserLayoutRoutes: Routes = [
  {
    path: "page/:name",
    component: HomeComponent,
  },
  {
    path: "",
    children: [
      {
        path: "customer",
        loadChildren: "../../stage/customer/customer.module#CustomerModule",
      },
    ],
  },
  {
    path: "customer",
    children: [
      {
        path: "trainer",
        loadChildren: "../../stage/trainer/trainer.module#TrainerModule",
      },
    ],
  },
];
