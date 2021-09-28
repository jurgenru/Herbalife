import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { ImageCropperModule } from 'ngx-image-cropper';
import { StoreService } from "./services/store.service";
import { BlogService } from "./services/blog.service";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { InterceptorService } from "./interceptors/interceptors.service";
import { UserService } from "./services/user.service";
import { ManagerService } from "./services/manager.service";
import { NgxPaginationModule } from "ngx-pagination";
import { ServiceService } from "./services/service.service";
import { StatementService } from "./services/statement.service";
import { TrainerService } from "./services/trainer.service";
import { UserLayoutComponent } from "./layouts/user-layout/user-layout.component";
import { ProfileService } from "./services/profile.service";
import { PromotionService } from "./services/promotion.service";
import { CartService } from "./services/cart.service";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { OrderService } from "./services/order.service";
import { CommentaryService } from "./services/commentary.service";
import { MomentModule } from 'angular2-moment';
import * as moment  from 'moment';
import { UploadFileService } from "./services/upload-file.service";
moment.locale('es');

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    ImageCropperModule,
    MomentModule,
    RouterModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, UserLayoutComponent, LoginComponent, RegisterComponent],
  providers: [
    AuthGuard,
    StoreService,
    BlogService,
    UserService,
    ManagerService,
    ServiceService,
    StatementService,
    TrainerService,
    ProfileService,
    PromotionService,
    CartService,
    OrderService,
    CommentaryService,
    // UploadFileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
