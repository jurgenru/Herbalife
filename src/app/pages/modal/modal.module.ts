import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalRoutingModule } from './modal.routing';
import { ModalComponent } from './modal.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { SimpleModalModule } from 'ngx-simple-modal';

@NgModule({
  declarations: [ModalComponent, ConfirmComponent],
  imports: [
    CommonModule,
    ModalRoutingModule,
    SimpleModalModule
  ],
  entryComponents: [
    ConfirmComponent
  ],
})
export class ModalModule { }
