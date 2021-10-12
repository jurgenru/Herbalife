import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { TrainerComponent } from "./trainer.component";
import { CreateComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";
import { ViewComponent } from "./view/view.component";
import { EditComponent } from "./edit/edit.component";
import { CardComponent } from "./card/card.component";

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
            }, {
                path: 'view/:id',
                component: ViewComponent

            }, {
                path: 'edit/:id',
                component: EditComponent
            },{
                path: 'card/:id',
                component: CardComponent
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
    ListComponent,
    ViewComponent,
    EditComponent,
    CardComponent
];