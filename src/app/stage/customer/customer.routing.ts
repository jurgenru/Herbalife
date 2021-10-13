import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityComponent } from "./activity/activity.component";
import { CreateComponent } from "./create/create.component";
import { CustomerComponent } from "./customer.component";
import { EditComponent } from "./edit/edit.component";
import { ResultComponent } from "./result/result.component";
import { ShoppingComponent } from "./shopping/shopping.component";
import { ViewComponent } from "./view/view.component";

export const routes: Routes = [
    {
        path: '',
        component: CustomerComponent,
        children: [{
            path: 'create',
            component: CreateComponent
        },{
            path: 'view',
            component: ViewComponent
        }, {
            path: 'edit',
            component: EditComponent
        },{
            path: 'activity',
            component: ActivityComponent
        }
        ,{
            path: 'shopping',
            component: ShoppingComponent
        },
        {
            path: 'result/:id',
            component: ResultComponent
        }
    ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {}
export const routedComponents = [
    CustomerComponent,
    CreateComponent,
    ViewComponent,
    EditComponent,
    ActivityComponent,
    ShoppingComponent,
]
