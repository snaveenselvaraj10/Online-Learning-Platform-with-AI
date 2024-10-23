import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/Course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'https://localhost:7013/api/Course'; // Adjust based on your API

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${courseId}`);
  }
  enrollInCourse(courseId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId });
  }
}
