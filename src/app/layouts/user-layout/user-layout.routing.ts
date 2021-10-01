import { Routes } from "@angular/router";
import { HomeComponent } from "src/app/pages/home/home.component";
import { TestComponent } from "src/app/stage/test/test.component";

export const UserLayoutRoutes: Routes = [
  {
    path: 'home', component: HomeComponent
  }, {
    path: "",
    children: [
      {
        path: "customer",
        loadChildren: "../../stage/customer/customer.module#CustomerModule",
      },
    ],
  }, {
    path: "customer",
    children: [
      {
        path: "trainer",
        loadChildren: "../../stage/trainer/trainer.module#TrainerModule",
      },
    ],
  }, {
    path: 'customer',
    children: [{
      path: 'blog',
      loadChildren: '../../stage/blog/blog.module#BlogModule'
    }]
  }, {
    path: 'customer',
    children: [{
      path: 'store',
      loadChildren: '../../stage/store/store.module#StoreModule'
    }]
  }, {
    path: 'customer',
    children: [{
      path: 'service',
      loadChildren: '../../stage/service/service.module#ServiceModule'
    }]
  },{
    path: 'customer/test', component: TestComponent
  }
]
