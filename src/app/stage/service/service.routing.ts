import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { ServiceComponent } from "./service.component";
import { ViewComponent } from "./view/view.component";

const routes: Routes = [{
    path: '',
    component: ServiceComponent,
    children: [
        {
            path: 'view/:id',
            component: ViewComponent
        }, {
            path: 'list',
            component: ListComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServiceRoutingModule { }
export const routedComponents = [
    ServiceComponent,
    ViewComponent,
    ListComponent
]
