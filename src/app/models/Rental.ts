export interface Rental {
  id?: number;
  userId: number;
  carId: number;
  driverId?: number;
  startDate: Date;
  endDate: Date;
  pickUpLocation: string;
  dropOffLocation: string;
  totalPrice: number;
}
