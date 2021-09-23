import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ImageCropperModule } from "ngx-image-cropper";
import { SimpleModalModule } from "ngx-simple-modal";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { CustomerRoutingModule, routedComponents } from "./customer.routing";
import { ActivityComponent } from './activity/activity.component';
import { ShoppingComponent } from './shopping/shopping.component';

@NgModule({
    declarations: [
        ...routedComponents,
        ActivityComponent,
        ShoppingComponent,
    ],
    imports: [
        RouterModule,
        CustomerRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        SimpleModalModule,
        ImageCropperModule,
        NgbModule,
        NgxUiLoaderModule,
    ],
    exports: [
        ...routedComponents
    ]
})
export class CustomerModule {}