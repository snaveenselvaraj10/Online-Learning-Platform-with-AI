import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/Course.model'; 
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class UserCourseService {
  private apiUrl = `${environment.apiUrl}/usercourses`; // Your API endpoint

  constructor(private http: HttpClient) {}

  // Get all courses that a user is enrolled in
  getCoursesForUser(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/user/${userId}/courses`);
  }

  // Enroll a user in a course
  enrollUserInCourse(userId: number, courseId: number): Observable<any> {
    const payload = { userId, courseId };
    return this.http.post(`${this.apiUrl}/enroll`, payload);
  }

  // Unenroll a user from a course
  unenrollUserFromCourse(userId: number, courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/unenroll/${userId}/${courseId}`);
  }
}
