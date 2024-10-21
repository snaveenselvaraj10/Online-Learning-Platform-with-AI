import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service'; 
import { Course } from '../models/Course.model';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  loading = true;
  error: string | null = null;
  searchTerm: string = ''; // Define searchTerm property

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
  
}
