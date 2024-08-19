export interface RentalResponse {
    rentalId: number;
    carId: number;
    userId: number;
    driverId: number | null;
    pickUpLocation: string;
    dropOffLocation: string;
    startDate: string;
    endDate: string;
    totalPrice: string;

    // User details
    userFirstName: string;
    userLastName: string;
    userEmail: string;

    // Car details
    carMake: string;
    carModel: string;
    carType: string;
    carRentalPrice: string;
}
