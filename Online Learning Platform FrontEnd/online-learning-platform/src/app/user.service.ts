import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This allows the service to be injected application-wide
})
export class UserService {
  private apiUrl = 'https://localhost:44391/api/users'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Method to get all users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Additional methods to interact with user-related endpoints can be added here
}
