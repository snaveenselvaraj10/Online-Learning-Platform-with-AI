import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Define the interfaces based on your model
interface Article {
  articleId: number;
  title: string;
  content: string;
}

interface UserCourse {
  userId: number;
  courseId: number;
  progress: number;
}

interface Course {
  courseId: number;
  title: string;
  description: string;
  articles: Article[];
  userCourses: UserCourse[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'https://localhost:7013/api/Course'; // The API endpoint for courses

  constructor(private http: HttpClient) {}

  // Method to get the list of courses
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching courses', error);
        return throwError(() => new Error('Failed to load courses. Please try again later.'));
      })
    );
  }

  // Method to get a single course by ID
  getCourseById(courseId: number): Observable<Course> {
    const url = `${this.apiUrl}/${courseId}`;
    return this.http.get<Course>(url).pipe(
      catchError((error) => {
        console.error('Error fetching course details', error);
        return throwError(() => new Error('Failed to load course details. Please try again later.'));
      })
    );
  }
}
