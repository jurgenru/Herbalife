import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlogStageComponent } from './blog-stage.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
    path: '',
    component: BlogStageComponent,
    children: [
        {
            path: 'list',
            component: ListComponent
        },
        {
            path: 'view',
            component: ViewComponent
        }
    ]
}];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogStageRoutingModule { }
export const routedComponents = [
    BlogStageComponent,
    ListComponent,
    ViewComponent,
]
