import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { CarListComponent } from './components/car-list/car-list.component';
import { RentalFormComponent } from './components/rental-form/rental-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarManagementComponent } from './components/car-management/car-management.component';

const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'rent', component: RentalFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'car-details/:id', component: CarDetailsComponent },
  { path: 'car-management', component: CarManagementComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
