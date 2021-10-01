import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { HomeComponent } from "src/app/pages/home/home.component";
import { UserLayoutRoutes } from "./user-layout.routing";
import { TestComponent } from "src/app/stage/test/test.component";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        NgxUiLoaderModule,
        ComponentsModule,
    ],
    declarations: [
        HomeComponent,
        TestComponent,
    ]
})
export class UserLayoutModule { }