import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Course } from '../models/Course.model';

@Component({
  selector: 'app-enrolled-courses',
  templateUrl: './enrolled-courses.component.html',
  styleUrls: ['./enrolled-courses.component.css']
})
export class EnrolledCoursesComponent implements OnInit {
  enrolledCourses: Course[] = [];
  loading = true;
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = 1;  // Replace with the actual logged-in user ID

    this.userService.getEnrolledCourses(userId).subscribe({
      next: (courses: Course[]) => {
        this.enrolledCourses = courses;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load enrolled courses.';
        this.loading = false;
      }
    });
  }
}
