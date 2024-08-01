import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/Car';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  car: Car | undefined;

  constructor(private route: ActivatedRoute, private carService: CarService) {}

  ngOnInit(): void {
    const carId = Number(this.route.snapshot.paramMap.get('id'));
    this.carService.getCarById(carId).subscribe(
      (car) => {
        this.car = car;
      },
      (error) => {
        console.error('Failed to load car details', error);
      }
    );
  }
}
