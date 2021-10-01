import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { OrderComponent } from './order.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
    {
        path: '',
        component: OrderComponent,
        children: [{
            path: 'list',
            component: ListComponent
        }, {
            path: 'edit/:id',
            component: EditComponent
        }, {
            path: 'view/:id',
            component: ViewComponent
        }]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule { }
export const routedComponents = [
    ListComponent,
    OrderComponent,
    EditComponent,
    ViewComponent
];