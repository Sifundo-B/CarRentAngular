import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { CarListComponent } from './components/car-list/car-list.component';
import { RentalFormComponent } from './components/rental-form/rental-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarManagementComponent } from './components/car-management/car-management.component';
import { DriverManagementComponent } from './components/driver-management/driver-management.component';
import { RentalDetailsComponent } from './components/rental-details/rental-details.component';

const routes: Routes = [
  { path: 'home', component: CarListComponent },
  { path: 'rent', component: RentalFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'car-details/:id', component: CarDetailsComponent },
  { path: 'rental-details/:rentalId', component: RentalDetailsComponent },
  { path: 'car-management', component: CarManagementComponent, canActivate: [AuthGuard] },
  { path: 'driver-management', component: DriverManagementComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
