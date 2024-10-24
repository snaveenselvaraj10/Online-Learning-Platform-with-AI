import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CoursesComponent } from './courses/courses.component';
import { EnrolledCoursesComponent } from './enrolled-courses/enrolled-courses.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'enrolled-courses', component: EnrolledCoursesComponent },
  { path: 'courses', component: CoursesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]                  
})
export class AppRoutingModule { }
