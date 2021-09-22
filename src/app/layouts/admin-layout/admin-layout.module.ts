import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SimpleModalModule } from 'ngx-simple-modal';
import { SaleComponent } from '../../pages/sale/sale.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    SimpleModalModule,
  ],
  declarations: [
    DashboardComponent,
    SaleComponent
  ]
})
export class AdminLayoutModule { }
