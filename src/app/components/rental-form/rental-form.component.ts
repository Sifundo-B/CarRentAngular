import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/services/driver.service';
import { RentalService } from 'src/app/services/rental.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.scss']
})
export class RentalFormComponent implements OnInit {
  rentalForm: FormGroup;
  drivers: any[] = [];

  constructor(
    private rentalService: RentalService,
    private driverService: DriverService,
    private fb: FormBuilder
  ) {
    this.rentalForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      pickUpLocation: [''],
      dropOffLocation: [''],
      driverId: ['']
    });
  }

  ngOnInit(): void {
    this.driverService.getDrivers().subscribe((drivers) => {
      this.drivers = drivers;
    });
  }

  rentCar() {
    const rentalData = this.rentalForm.value;
    const carId = 1; // Placeholder, replace with actual car ID
    const userId = 1; // Placeholder, replace with actual user ID

    this.rentalService.rentCar({
      userId: userId,
      carId: carId,
      driverId: rentalData.driverId !== 'null' ? rentalData.driverId : undefined,
      startDate: rentalData.startDate,
      endDate: rentalData.endDate,
      pickUpLocation: rentalData.pickUpLocation,
      dropOffLocation: rentalData.dropOffLocation,
      totalPrice: 0 // The backend will calculate the actual total price
    }).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Car Rented Successfully',
          text: 'Your rental request has been processed.',
        });
        console.log('Car rented successfully', response);
        // Handle additional success actions here
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Rental Failed',
          text: 'There was an issue processing your rental. Please try again.',
        });
        console.error('Failed to rent car', error);
        // Handle additional error actions here
      }
    );
  }
}
