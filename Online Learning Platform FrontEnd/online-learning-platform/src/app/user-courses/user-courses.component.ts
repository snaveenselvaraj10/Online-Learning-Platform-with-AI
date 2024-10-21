import { Component, OnInit } from '@angular/core';
import { UserCourseService } from 'src/app/user-course.service';
import { Course } from 'src/app/models/Course.model'; // Assuming you have a Course model

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css']
})
export class UserCoursesComponent implements OnInit {
  courses: Course[] = [];
  userId: number = 1;  // Assuming a user is logged in with this ID
  loading: boolean = true;
  error: string | null = null;

  constructor(private userCourseService: UserCourseService) {}

  ngOnInit(): void {
    this.getUserCourses();
  }

  getUserCourses() {
    this.userCourseService.getCoursesForUser(this.userId).subscribe(
      (courses) => {
        this.courses = courses;
        this.loading = false;
      },
      (err) => {
        this.error = 'Failed to load user courses';
        this.loading = false;
      }
    );
  }

  enrollInCourse(courseId: number) {
    this.userCourseService.enrollUserInCourse(this.userId, courseId).subscribe(
      (response) => {
        alert('Enrolled successfully');
        this.getUserCourses();  // Reload courses after enrolling
      },
      (err) => {
        alert('Failed to enroll in course');
      }
    );
  }

  unenrollFromCourse(courseId: number) {
    this.userCourseService.unenrollUserFromCourse(this.userId, courseId).subscribe(
      (response) => {
        alert('Unenrolled successfully');
        this.getUserCourses();  // Reload courses after unenrolling
      },
      (err) => {
        alert('Failed to unenroll from course');
      }
    );
  }
}
