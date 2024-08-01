import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  cars: any[] = [];

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.carService.getAvailableCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  viewCarDetails(carId: number): void {
    this.router.navigate(['/car-details', carId]);
  }
}
