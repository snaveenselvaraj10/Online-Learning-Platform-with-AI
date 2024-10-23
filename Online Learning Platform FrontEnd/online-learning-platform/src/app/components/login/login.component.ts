import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log(response); 
        if (response.message === "Success") {  
          console.log("Hi Helo")
          this.router.navigate(['/courses']);  
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      error: (err) => {
        console.error(err); // Log the error
        this.errorMessage = 'Invalid email or password'; // Show this message if the API call fails
      }
    });
  }
}
