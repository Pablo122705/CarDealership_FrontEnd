import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './side-login.component.html',
  styleUrls: []
})
export class SideLoginComponent implements AfterViewInit {
  usernameInput!: HTMLInputElement;
  passwordInput!: HTMLInputElement;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    const inputs = document.querySelectorAll('mat-form-field input');
    if (inputs.length >= 2) {
      this.usernameInput = inputs[0] as HTMLInputElement;
      this.passwordInput = inputs[1] as HTMLInputElement;

      const enterLink = document.querySelector('a[routerLink="/"]');
      if (enterLink) {
        enterLink.addEventListener('click', (event) => {
          event.preventDefault();
          this.login();
        });
      }
    }
  }

  login() {
    const username = this.usernameInput.value;
    const password = this.passwordInput.value;

    if (username && password) {
      this.authService.login({ username, password }).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/customers']);
          }
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          alert('Credenciales inválidas. Por favor, intenta de nuevo.');
        }
      });
    } else {
      alert('Por favor, ingrese usuario y contraseña.');
    }
  }
}