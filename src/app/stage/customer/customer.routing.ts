import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { CustomerComponent } from "./customer.component";

export const routes: Routes = [
    {
        path: '',
        component: CustomerComponent,
        children: [{
            path: 'create',
            component: CreateComponent
        }]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {}
export const routedComponents = [
    CustomerComponent,
    CreateComponent
]
