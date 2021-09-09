import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";
import { StoreComponent } from "./store.component";
import { ViewComponent } from "./view/view.component";

export const routes: Routes = [
    {
        path: '',
        component: StoreComponent,
        children: [{
            path: 'create',
            component: CreateComponent
        },
        {
            path: 'list',
            component: ListComponent
        }, {
            path: 'view/:id',
            component: ViewComponent
        }]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoreRoutingModule { }
export const routedComponents = [
    StoreComponent,
    CreateComponent,
    ListComponent,
    ViewComponent
]