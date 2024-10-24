import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { Course } from './models/Course.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7013/api/User'; // Adjust based on your API

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getEnrolledCourses(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/${userId}/enrolled-courses`);
  }
}
