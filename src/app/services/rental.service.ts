import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from '../models/Rental';
import { environment } from '../environments/environment';
import { RentalRequest } from '../models/RentalRequest';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  rentCar(rentalRequest: RentalRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/rentals/rent`, rentalRequest);
  }

  getRentalsByUser(userId: number): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.apiUrl}/rentals/user/${userId}`);
  }

  getRentalById(rentalId: string): Observable<Rental> {
    return this.http.get<Rental>(`${this.apiUrl}/rentals/${rentalId}`);
  }
}
