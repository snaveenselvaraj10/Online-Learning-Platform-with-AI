import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './users/users.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseService } from 'src/app/course.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CoursesComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CourseService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
