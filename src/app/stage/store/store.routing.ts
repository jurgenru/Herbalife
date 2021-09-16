import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { StoreComponent } from "./store.component";
import { DetailComponent } from "./detail/detail.component";
import { ListComponent } from "./list/list.component";

export const routes: Routes = [
    {
        path: '',
        component: StoreComponent,
        children: [
        {
            path: 'detail/:id',
            component: DetailComponent
        }, {
            path: 'view/:id',
            component: ViewComponent
        },{
            path: 'list',
            component: ListComponent
        }]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoreRoutingModule { }
export const routedComponents = [
    StoreComponent,
    DetailComponent,
    ViewComponent,
    ListComponent
]