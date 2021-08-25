import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { StoreComponent } from "./store.component";

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
            component: CreateComponent
        }]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BooksRoutingModule { }
export const routedComponents = [
    StoreComponent,
    CreateComponent
]