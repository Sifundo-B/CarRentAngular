import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from 'src/app/services/rental.service';
import { DriverService } from 'src/app/services/driver.service';
import { RentalResponse } from 'src/app/models/RentalResponse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.scss']
})
export class RentalDetailsComponent implements OnInit {
  rentalDetails: RentalResponse | null = null;
  driverDetails: any;

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private driverService: DriverService
  ) {}

  ngOnInit(): void {
    const rentalId = this.route.snapshot.paramMap.get('rentalId');
    this.loadRentalDetails(rentalId);
  }

  loadRentalDetails(rentalId: string | null): void {
    if (rentalId) {
      const rentalIdNumber = Number(rentalId);  // Convert rentalId to a number
      this.rentalService.getRentalById(rentalIdNumber).subscribe(
        (details: RentalResponse) => {
          this.rentalDetails = details;
          if (this.rentalDetails.driverId) {
            this.loadDriverDetails(this.rentalDetails.driverId);
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load rental details. Please try again later.'
          });
          console.error('Failed to load rental details', error);
        }
      );
    }
  }

  loadDriverDetails(driverId: number): void {
    this.driverService.getDriverById(driverId).subscribe(
      (details) => {
        this.driverDetails = details;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load driver details. Please try again later.'
        });
        console.error('Failed to load driver details', error);
      }
    );
  }

  viewDriverLicense(): void {
    if (this.driverDetails && this.driverDetails.licenseImageUrl) {
      window.open(this.driverDetails.licenseImageUrl, '_blank');
    }
  }
}
