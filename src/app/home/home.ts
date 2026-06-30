import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  isOpen = true;
  currentPage = 'home';

  constructor(private router: Router) {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  showPage(page: string) {
    this.currentPage = page;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}