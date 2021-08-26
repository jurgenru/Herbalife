import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { TrainerComponent } from "./trainer.component";
import { CreateComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";

export const routes: Routes = [
    {
        path: '',
        component: TrainerComponent,
        children: [
            {
                path: 'list',
                component: ListComponent
            },
            {
                path: 'create',
                component: CreateComponent
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class TrainerRoutingModule { }
export const routedComponents = [
    TrainerComponent,
    CreateComponent,
    ListComponent
];