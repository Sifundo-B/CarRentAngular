import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from 'src/app/services/rental.service';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.scss']
})
export class RentalDetailsComponent implements OnInit {
  rentalDetails: any;
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
      this.rentalService.getRentalById(rentalId).subscribe((details) => {
        this.rentalDetails = details;
        if (this.rentalDetails.driverId) {
          this.loadDriverDetails(this.rentalDetails.driverId);
        }
      });
    }
  }

  loadDriverDetails(driverId: number): void {
    this.driverService.getDriverById(driverId).subscribe((details) => {
      this.driverDetails = details;
    });
  }
}
