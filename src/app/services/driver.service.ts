import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from '../models/Driver';
import { environment } from '../environments/environment';
;

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.apiUrl}/drivers`);
  }

  addDriver(driver: Driver, file: File): Observable<Driver> {
    const formData = new FormData();
    formData.append('licenseFile', file);
    formData.append('driver', JSON.stringify(driver));
    return this.http.post<Driver>(`${this.apiUrl}/drivers/add`, formData);
  }
}