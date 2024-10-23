import { Router } from '@angular/router';  // Import Router
import { CourseService } from '../course.service';
import { Course } from '../models/Course.model';
import { Component, OnInit } from '@angular/core';

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

  constructor(private courseService: CourseService, private router: Router) {} // Inject Router

  ngOnInit() {
    // Load courses
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
    if (this.userId === 0) {
      this.errorMessage = 'You need to be logged in to enroll in a course';
      return;
    }

    this.courseService.enrollInCourse(courseId, this.userId).subscribe({
      next: (response) => {
        if (response.message === 'Successfully enrolled') {
          this.successMessage = 'Successfully enrolled in the course';
          this.errorMessage = '';

          // Redirect to the enrolled courses page after successful enrollment
          this.router.navigate(['/enrolled-courses']);
        } else {
          this.errorMessage = 'Failed to enroll in the course';
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to enroll in the course';
        this.successMessage = '';
      }
    });
  }
}
