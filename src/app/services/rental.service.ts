import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from '../models/Rental';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  rentCar(rental: Rental): Observable<Rental> {
    return this.http.post<Rental>(`${this.apiUrl}/rentals/rent`, rental);
  }

  getRentalsByUser(userId: number): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.apiUrl}/rentals/user/${userId}`);
  }
}