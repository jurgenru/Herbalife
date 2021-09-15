import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlogComponent } from './blog.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
    path: '',
    component: BlogComponent,
    children: [
        {
            path: 'list',
            component: ListComponent
        },
        {
            path: 'view/:id',
            component: ViewComponent
        }
    ]
}];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }
export const routedComponents = [
    BlogComponent,
    ListComponent,
    ViewComponent,
]
