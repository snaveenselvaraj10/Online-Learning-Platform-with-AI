import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'; 
import { AppComponent } from './app.component';
import { UserComponent } from './users/users.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseService } from 'src/app/course.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserService } from './user.service';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { ArticlesComponent } from './articles/articles.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CoursesComponent,
    PageNotFoundComponent,
    CourseDetailsComponent,
    ArticlesComponent,
    UserCoursesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CourseService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
