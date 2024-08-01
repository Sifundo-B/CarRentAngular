import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/Car';

@Component({
  selector: 'app-car-management',
  templateUrl: './car-management.component.html',
  styleUrls: ['./car-management.component.scss']
})
export class CarManagementComponent implements OnInit {
  carForm: FormGroup;
  cars: Car[] = [];

  constructor(private fb: FormBuilder, private carService: CarService) {
    this.carForm = this.fb.group({
      make: [''],
      model: [''],
      type: [''],
      rentalPrice: [''],
      file: [null]
    });
  }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars() {
    this.carService.getAvailableCars().subscribe(
      (cars) => {
        this.cars = cars;
      },
      (error) => {
        console.error('Failed to load cars', error);
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.carForm.patchValue({ file: file });
  }

  addCar() {
    const carData = this.carForm.value;
    const car: Car = {
      id: 0, // Placeholder; will be assigned by the backend
      make: carData.make,
      model: carData.model,
      type: carData.type,
      rentalPrice: carData.rentalPrice,
      imageUrl: '', // Placeholder; will be assigned after uploading
      availability: true // Default to available when adding a new car
    };

    this.carService.addCar(car, carData.file).subscribe(
      (response) => {
        console.log('Car added successfully', response);
        this.loadCars(); // Reload the car list to include the new car
      },
      (error) => {
        console.error('Failed to add car', error);
      }
    );
  }

  toggleAvailability(car: Car) {
    const updatedAvailability = !car.availability;
    this.carService.updateCarAvailability(car.id, updatedAvailability).subscribe(
      (updatedCar) => {
        car.availability = updatedCar.availability;
      },
      (error) => {
        console.error('Failed to update car availability', error);
      }
    );
  }
}
