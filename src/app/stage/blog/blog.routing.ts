import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlogComponent } from './blog.component';
import { DetailComponent } from "./detail/detail.component";
import { ListComponent } from "./list/list.component";
import { ViewComponent } from "./view/view.component";

const routes: Routes = [{
    path: '',
    component: BlogComponent,
    children: [
        {
            path: 'detail/:id',
            component: DetailComponent
        },
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
export class BlogRoutingModule { }
export const routedComponents = [
    BlogComponent,
    ViewComponent,
    DetailComponent,
    ListComponent
]
