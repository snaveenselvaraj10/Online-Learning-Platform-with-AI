import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './users/users.component';
import { CoursesComponent } from './courses/courses.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; // Optional
import { CourseDetailsComponent } from './course-details/course-details.component';
import { ArticlesComponent } from './articles/articles.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';

// Define routes for your application
const routes: Routes = [
  { path: 'users', component: UserComponent },     
  { path: 'courses', component: CoursesComponent },  
  { path: 'course/:id', component: CourseDetailsComponent },  
  { path: 'articles', component: ArticlesComponent },
  { path: 'user-courses', component: UserCoursesComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },  
  { path: '**', component: PageNotFoundComponent }   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Initialize routing with the defined routes
  exports: [RouterModule]                   // Export RouterModule to use in other modules
})
export class AppRoutingModule { }
