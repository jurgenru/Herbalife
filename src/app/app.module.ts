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
import { HomeComponent } from "./pages/home/home.component";
import { ImageCropperModule } from 'ngx-image-cropper';
import { StoreService } from "./services/store.service";
import { BlogService } from "./services/blog.service";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { InterceptorService } from "./interceptors/interceptors.service";
import { UserService } from "./services/user.service";
import { ManagerService } from "./services/manager.service";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    ImageCropperModule,
    RouterModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, HomeComponent],
  providers: [
    StoreService,
    BlogService,
    UserService,
    ManagerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
