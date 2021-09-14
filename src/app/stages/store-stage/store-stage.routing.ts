import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { StoreStageComponent } from "./store-stage.component";
import { ViewComponent } from "./view/view.component";

export const routes: Routes = [
    {
        path: '',
        component: StoreStageComponent,
        children: [
        {
            path: 'list',
            component: ListComponent
        }, {
            path: 'view',
            component: ViewComponent
        },
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoreStageRoutingModule { }
export const routedComponents = [
    StoreStageComponent,
    ListComponent,
    ViewComponent
]