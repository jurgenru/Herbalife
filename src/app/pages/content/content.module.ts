import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content.routing';
import { routedComponents } from '../content/content.routing';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    ContentRoutingModule,
    NgbModule
  ]
})
export class ContentModule { }
