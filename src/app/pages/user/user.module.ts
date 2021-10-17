import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule, routedComponents } from './user.routing';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ComponentsModule } from 'src/app/components/components.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    NgbModule,
    FormsModule,
    ImageCropperModule,
    SimpleModalModule,
    NgxUiLoaderModule,
    ComponentsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-pQvJ1fD_ohk_PxaUMLjqVDhsMDsA3as'
    }),
  ],
  exports: [
    ...routedComponents
  ]
})
export class UserModule { }
