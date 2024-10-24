import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Register a new user
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  // Login user
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}api/auth/login`, credentials).pipe(
        catchError(this.handleError)
    );
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error.message || 'Something went wrong');
  }
}
