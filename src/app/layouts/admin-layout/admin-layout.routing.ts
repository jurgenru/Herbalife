import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { SaleComponent } from "../../pages/sale/sale.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  { path: "sale", component: SaleComponent },
  {
    path: '',
    children: [{
      path: 'user',
      loadChildren: '../../pages/user/user.module#UserModule'
    }]
  },
  {
    path: '',
    children: [{
      path: 'store',
      loadChildren: '../../pages/store/store.module#StoreModule'
    }]
  },
  {
    path: '',
    children: [{
      path: 'service',
      loadChildren: '../../pages/service/service.module#ServiceModule'
    }]
  },
  {
    path: '',
    children: [{
      path: 'trainer',
      loadChildren: '../../pages/trainer/trainer.module#TrainerModule'
    }]
  },
  {
    path: '',
    children: [{
      path: 'content',
      loadChildren: '../../pages/content/content.module#ContentModule'
    }]
  },
  {
    path: '',
    children: [{
      path: 'blog',
      loadChildren: '../../pages/blog/blog.module#BlogModule'
    }]
  },
  {
    path: '',
    children: [{
      path: 'testimony',
      loadChildren: '../../pages/testimony/testimony.module#TestimonyModule'
    }]
  }
];
