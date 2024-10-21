import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './users/users.component';
import { CoursesComponent } from './courses/courses.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; // Optional

// Define routes for your application
const routes: Routes = [
  { path: 'users', component: UserComponent },      // Route for UsersComponent
  { path: 'courses', component: CoursesComponent },  // Route for CoursesComponent
  { path: '', redirectTo: '/users', pathMatch: 'full' },  // Default route
  { path: '**', component: PageNotFoundComponent }   // Wildcard route for 404 page (optional)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Initialize routing with the defined routes
  exports: [RouterModule]                   // Export RouterModule to use in other modules
})
export class AppRoutingModule { }
