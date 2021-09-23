import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { StoreComponent } from "./store.component";
import { DetailComponent } from "./detail/detail.component";
import { ListComponent } from "./list/list.component";
import { CartComponent } from "./cart/cart.component";
import { DeliveryComponent } from './delivery/delivery.component';

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
            },
            {
                path: 'cart',
                component: CartComponent
            },
            {
                path: 'delivery',
                component: DeliveryComponent
            }
        ]
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
    ListComponent,
    CartComponent,
    DeliveryComponent
]