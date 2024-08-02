export interface RentalRequest {
    carId: number;
    userId: number;
    startDate: string; // Use string format for dates when sending to backend
    endDate: string;
    driverId?: number;
    pickUpLocation: string;
    dropOffLocation: string;
  }
  