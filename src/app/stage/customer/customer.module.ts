import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ImageCropperModule } from "ngx-image-cropper";
import { SimpleModalModule } from "ngx-simple-modal";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { CustomerRoutingModule, routedComponents } from "./customer.routing";

@NgModule({
    declarations: [
        ...routedComponents,
    ],
    imports: [
        RouterModule,
        CustomerRoutingModule,
        ReactiveFormsModule,
        ImageCropperModule,
        SimpleModalModule,
        FormsModule,
        CommonModule,
        NgbModule,
        NgxUiLoaderModule,
    ],
    exports: [
        ...routedComponents
    ]
})
export class CustomerModule {}