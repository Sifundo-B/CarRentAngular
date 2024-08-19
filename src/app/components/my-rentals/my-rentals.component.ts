import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';
import { AuthService } from 'src/app/services/auth.service';
import { RentalResponse } from 'src/app/models/RentalResponse'; // Import the proper model

@Component({
  selector: 'app-my-rentals',
  templateUrl: './my-rentals.component.html',
  styleUrls: ['./my-rentals.component.scss']
})
export class MyRentalsComponent implements OnInit {
  rentals: RentalResponse[] = []; // Use the correct type for rentals

  constructor(
    private rentalService: RentalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.decodeToken()?.userId;
    if (userId) {
      this.rentalService.getRentalsByUser(userId).subscribe(
        (rentals: RentalResponse[]) => { // Ensure the correct type is used here
          this.rentals = rentals;
          if (rentals.length === 0) {
            console.log('No rentals found for this user.');
          }
        },
        (error) => {
          console.error('Failed to load rentals', error);
        }
      );
    } else {
      console.error('User ID is not available');
    }
  }
}
