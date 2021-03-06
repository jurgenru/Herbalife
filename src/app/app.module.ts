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
import { VirtualCardService } from "./services/virtual-card.service";
import { CustomerService } from "./services/customer.service";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { OrderService } from "./services/order.service";
import { CommentaryService } from "./services/commentary.service";
import { MomentModule } from 'angular2-moment';
import * as moment  from 'moment';
import { NotificationService } from "./services/notification.service";
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { InscriptionService } from "./services/inscription-service";
import { AppointmentService } from "./services/appointment.service";
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { InscriptionLection } from "./services/inscription-lection";
import { VirtualCardComponent } from "./virtual-card/virtual-card.component";
import { OptionsCardService } from "./services/options-card.service";
import { ComplaintService } from "./services/complaint.service";
import { AgmCoreModule } from '@agm/core';

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
    SocialLoginModule,
    NgxQRCodeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-pQvJ1fD_ohk_PxaUMLjqVDhsMDsA3as'
    }),
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, UserLayoutComponent, LoginComponent, RegisterComponent,VirtualCardComponent],
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
    VirtualCardService,
    CommentaryService,
    CustomerService,
    AppointmentService,
    InscriptionService,
    NotificationService,
    AppointmentService,
    OptionsCardService,
    InscriptionLection,
    ComplaintService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '694479197105-b05gqrr8th2paldhgt2h6iccc441l1pf.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('649187186107658')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
