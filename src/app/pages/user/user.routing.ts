import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserComponent } from "./user.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { ViewComponent } from "./view/view.component";

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: 'view',
                component: ViewComponent
            },
            {
                path: 'admin',
                component: CreateComponent
            },
            {
                path: 'edit',
                component: EditComponent
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class UserRoutingModule { }
export const routedComponents = [
    UserComponent,
    CreateComponent,
    EditComponent,
    ViewComponent
];