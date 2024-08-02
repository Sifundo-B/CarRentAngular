export interface Rental {
  id?: number; // Matches Java's Long id
  userId?: number; // Matches the user entity's id
  carId: number; // Matches the car entity's id
  driverId?: number; // Matches the driver entity's id
  pickUpLocation: string; // Matches pickUpLocation in Java
  dropOffLocation: string; // Matches dropOffLocation in Java
  startDate: Date; // Corresponds to rentalStartDate in Java (converted to LocalDate)
  endDate: Date; // Corresponds to rentalEndDate in Java (converted to LocalDate)
  totalPrice: number; // Corresponds to totalPrice in Java (converted to BigDecimal)
}
