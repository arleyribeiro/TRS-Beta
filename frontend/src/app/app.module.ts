import { UserFormComponent } from './users/user-form/user-form.component';
import { AuthInterceptor } from './guards/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthGuard } from './guards/auth.guard';
import { UsersGuard } from './guards/users.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { NavBarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './login/auth.service';
import { RulesService } from './rules/rules.service';
import { RuleFormComponent } from './rules/rule-form/rule-form.component';
import { UsersService } from './users/users.service';
import { TestComponent } from './test/test.component';
import { RulesModule } from './rules/rules.module';
import { NotificationComponent } from './notification/notification.component';
import { FooterComponent } from './footer/footer.component';
import { UsersModule } from './users/users.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoaderComponent } from './loader/loader.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavBarComponent,
    PageNotFoundComponent,
    TestComponent,
    NotificationComponent,
    FooterComponent,
    RegistrationComponent,
    LoaderComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppMaterialModule,
    AppRoutingModule,
    RulesModule,
    UsersModule
  ],
  providers: [
    AuthService, 
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UsersGuard,
    UsersService,
    RulesService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ TestComponent, RuleFormComponent, UserFormComponent]
})
export class AppModule { }
