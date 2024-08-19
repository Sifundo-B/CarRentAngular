import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { RentalRequest } from '../models/RentalRequest';
import { RentalResponse } from '../models/RentalResponse';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  rentCar(rentalRequest: RentalRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/rentals/rent`, rentalRequest);
  }

  getRentalsByUser(userId: number): Observable<RentalResponse[]> {
    return this.http.get<RentalResponse[]>(`${this.apiUrl}/rentals/user/${userId}`);
  }

  getRentalById(rentalId: number): Observable<RentalResponse> {
    return this.http.get<RentalResponse>(`${this.apiUrl}/rentals/${rentalId}`);
  }
}
