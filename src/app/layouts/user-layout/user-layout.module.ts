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
import { ShareButtonComponent } from '../../components/share-button/share-button.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        NgxUiLoaderModule,
    ],
    declarations: [
        HomeComponent,
        TestComponent,
        ShareButtonComponent
    ]
})
export class UserLayoutModule { }