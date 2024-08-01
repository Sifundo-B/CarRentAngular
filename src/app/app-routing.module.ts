import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { CarListComponent } from './components/car-list/car-list.component';
import { RentalFormComponent } from './components/rental-form/rental-form.component';

const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'rent', component: RentalFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
