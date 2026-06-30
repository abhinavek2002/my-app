import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isRegister = false;

  constructor(private http: HttpClient, private router: Router) {}

  submit() {
    const url = this.isRegister
      ? 'https://my-app-backend-oj8g.onrender.com/api/auth/register'
      : 'https://my-app-backend-oj8g.onrender.com/api/auth/login';

    this.http.post<any>(url, {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        if (!this.isRegister) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        } else {
          this.isRegister = false;
          this.errorMessage = 'Account created! Please login.';
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Something went wrong';
      }
    });
  }

  toggle() {
    this.isRegister = !this.isRegister;
    this.errorMessage = '';
  }
}