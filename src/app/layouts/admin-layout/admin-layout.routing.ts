import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth/auth.guard";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { SaleComponent } from "../../pages/sale/sale.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "sale", component: SaleComponent, canActivate: [AuthGuard] },
  {
    path: '',
    children: [{
      path: 'user',
      loadChildren: '../../pages/user/user.module#UserModule'
    }],
    canActivate: [AuthGuard]
  }, {
    path: '',
    children: [{
      path: 'store',
      loadChildren: '../../pages/store/store.module#StoreModule'
    }],
    canActivate: [AuthGuard]
  }, {
    path: '',
    children: [{
      path: 'service',
      loadChildren: '../../pages/service/service.module#ServiceModule'
    }],
    canActivate: [AuthGuard]
  }, {
    path: '',
    children: [{
      path: 'trainer',
      loadChildren: '../../pages/trainer/trainer.module#TrainerModule'
    }],
    canActivate: [AuthGuard]
  }, {
    path: '',
    children: [{
      path: 'content',
      loadChildren: '../../pages/content/content.module#ContentModule'
    }],
    canActivate: [AuthGuard]
  }, {
    path: '',
    children: [{
      path: 'blog',
      loadChildren: '../../pages/blog/blog.module#BlogModule'
    }],
    canActivate: [AuthGuard]
  }, {
    path: '',
    children: [{
      path: 'testimony',
      loadChildren: '../../pages/testimony/testimony.module#TestimonyModule'
    }],
    canActivate: [AuthGuard]
  }, {
    path: '',
    children: [{
      path: 'order',
      loadChildren: '../../pages/order/order.module#OrderModule'
    }],
    canActivate: [AuthGuard]
  }, {
    path: '',
    children: [{
      path: 'schedule',
      loadChildren: '../../pages/schedule/schedule.module#ScheduleModule'
    }],
    canActivate: [AuthGuard]
  }
];
