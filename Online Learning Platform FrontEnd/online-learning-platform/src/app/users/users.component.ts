import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/user.service'; // Import the service and User interface

@Component({
  selector: 'app-users',                     // The component selector
  templateUrl: './users.component.html',       // The component template
  styleUrls: ['./users.component.css']         // The component styles
})
export class UserComponent implements OnInit {
  users: User[] = [];
  error: string = '';
  loading: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
