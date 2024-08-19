import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { CarListComponent } from './components/car-list/car-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RentalFormComponent } from './components/rental-form/rental-form.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CarManagementComponent } from './components/car-management/car-management.component';
import { DriverManagementComponent } from './components/driver-management/driver-management.component';
import { RentalDetailsComponent } from './components/rental-details/rental-details.component';
import { MyRentalsComponent } from './components/my-rentals/my-rentals.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarListComponent,
    RentalFormComponent,
    CarDetailsComponent,
    LoginComponent,
    RegisterComponent,
    CarManagementComponent,
    DriverManagementComponent,
    RentalDetailsComponent,
    MyRentalsComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }