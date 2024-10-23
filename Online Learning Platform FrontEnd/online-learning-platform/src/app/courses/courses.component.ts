import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service'; 
import { Course } from '../models/Course.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  loading = true;
  error: string | null = null;
  userId: number = 0;
  searchTerm: string = ''; 
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe(
      (data: Course[]) => {
        this.courses = data.map(course => ({
          ...course,
          articles: course.articles || [] // Ensure articles is always an array
        }));
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load courses';
        this.loading = false;
      }
    );
  }
  
  filteredCourses() {
    if (!this.searchTerm) {
      return this.courses; // Return all courses if no search term is entered
    }
  
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  enroll(courseId: number): void {
    this.courseService.enrollInCourse(courseId, this.userId).subscribe({
      next: () => {
        this.successMessage = 'Successfully enrolled in the course';
      },
      error: () => {
        this.errorMessage = 'Failed to enroll in the course';
      }
    });
  }
  
}
