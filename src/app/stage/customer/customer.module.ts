import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CustomerRoutingModule, routedComponents } from "./customer.routing";

@NgModule({
    declarations: [
        ...routedComponents,
    ],
    imports: [
        RouterModule,
        CustomerRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgbModule
    ],
    exports: [
        ...routedComponents
    ]
})
export class CustomerModule {}