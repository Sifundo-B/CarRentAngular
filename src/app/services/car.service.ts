import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/Car';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAvailableCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/cars/available`);
  }
  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/cars`);
  }
  addCar(car: Car, file: File): Observable<Car> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('car', JSON.stringify(car));
    return this.http.post<Car>(`${this.apiUrl}/cars/admin/add`, formData);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/cars/${id}`);
  }

  updateCarAvailability(carId: number, availability: boolean): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/cars/${carId}/availability`, { availability });
  }
}
