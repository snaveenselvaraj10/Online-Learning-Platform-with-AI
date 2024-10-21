import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service'; // Import the service

// Define the interface for the Course model
interface Course {
  courseId: number;
  title: string;
  description: string;
  articles: any[];
  userCourses: any[];
}

@Component({
  selector: 'app-courses',                    // The component selector
  templateUrl: './courses.component.html',     // Path to the component's template
  styleUrls: ['./courses.component.css']       // Path to the component's stylesheet
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  error: string = '';
  loading: boolean = true;

  constructor(private courseService: CourseService) {} // Inject the CourseService

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
