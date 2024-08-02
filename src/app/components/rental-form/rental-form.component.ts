import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverService } from 'src/app/services/driver.service';
import { RentalService } from 'src/app/services/rental.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.scss']
})
export class RentalFormComponent implements OnInit {
  rentalForm: FormGroup;
  drivers: any[] = [];
  carId!: number;

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private driverService: DriverService,
    private authService: AuthService,private router: Router ,
    private fb: FormBuilder
  ) {
    this.rentalForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      pickUpLocation: ['', Validators.required],
      dropOffLocation: ['', Validators.required],
      driverId: ['']
    });
  }

  ngOnInit(): void {
    this.carId = Number(this.route.snapshot.paramMap.get('carId'));
    this.driverService.getDrivers().subscribe((drivers) => {
      this.drivers = drivers;
    });
  }

  rentCar() {
    if (this.rentalForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please fill in all required fields correctly.',
      });
      return;
    }

    const rentalData = this.rentalForm.value;
    const userId = this.authService.decodeToken()?.userId || 1;
    const rentalRequest = {
      userId: userId,
      carId: this.carId,
      driverId: rentalData.driverId ? rentalData.driverId : undefined,
      startDate: rentalData.startDate,
      endDate: rentalData.endDate,
      pickUpLocation: rentalData.pickUpLocation,
      dropOffLocation: rentalData.dropOffLocation,
      totalPrice: 500 
    };

    this.rentalService.rentCar(rentalRequest).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Car Rented Successfully',
          text: 'Your rental request has been processed.',
        });
        this.rentalForm.reset(); // Clear the form
        this.router.navigate(['/rental-details', response.rentalId]); // Navigate to rental details
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Rental Failed',
          text: 'There was an issue processing your rental. Please try again.',
        });
        console.error('Failed to rent car', error);
      }
    );
  }
}
