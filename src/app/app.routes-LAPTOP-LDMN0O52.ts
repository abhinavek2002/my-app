import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { App } from './app/app';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: App, canActivate: [authGuard] },
  { path: '', canActivate: [authGuard], redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];