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

  // Form variables — input-മായി two-way bind ആകും
  username = '';
  password = '';
  errorMessage = '';
  isRegister = false;  // false = Login mode, true = Register mode

  constructor(private http: HttpClient, private router: Router) {}

  submit() {
    // isRegister-ന്റെ value നോക്കി URL decide ചെയ്യും
    const url = this.isRegister
      ? 'http://localhost:3000/api/auth/register'
      : 'http://localhost:3000/api/auth/login';

    // Backend-ലേക്ക് POST request
    this.http.post<any>(url, {
      username: this.username,
      password: this.password
    }).subscribe({

      // Success ആയാൽ
      next: (res) => {
        if (!this.isRegister) {
          localStorage.setItem('token', res.token); // Token save
          this.router.navigate(['/home']);           // Dashboard-ലേക്ക്
        } else {
          this.isRegister = false;                  // Login mode-ലേക്ക് switch
          this.errorMessage = 'Account created! Please login.';
        }
      },

      // Error ആയാൽ
      error: (err) => {
        this.errorMessage = err.error.message || 'Something went wrong';
      }
    });
  }

  // Login ↔ Register switch ചെയ്യാൻ
  toggle() {
    this.isRegister = !this.isRegister;
    this.errorMessage = '';
  }
}