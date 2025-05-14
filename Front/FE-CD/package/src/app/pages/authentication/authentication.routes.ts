import { Routes } from '@angular/router';

export const authenticationRoutes: Routes = [
  {
     path: 'login',

      loadComponent: () => import('./side-login/side-login.component').then(m => m.SideLoginComponent) }
];
