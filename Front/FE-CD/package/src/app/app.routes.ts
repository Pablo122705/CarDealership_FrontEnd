import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Ruta pública para login
  {
    path: '',
    component: BlankComponent,
    children: [
      {
  path: 'login', loadComponent: () => import('./pages/authentication/side-login/side-login.component').then(m => m.SideLoginComponent ) },
  { path: '**', redirectTo: '/login' }

    ],
  },


 
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      }, 
      {
        path: 'CarDealership',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
        canActivate: [AuthGuard]
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ), canActivate: [AuthGuard]
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./features/customers/customers.component').then(
            (m) => m.CustomersComponent
          ), canActivate: [AuthGuard]
      },
      {
        path: 'vehicles',
        loadComponent: () =>
          import('./features/vehicles/vehicles.component').then(
            (m) => m.VehiclesComponent
          ), canActivate: [AuthGuard]
      },
      {
        path: 'sales',
        loadComponent: () =>
          import('./features/sales/sales.component').then(
            (m) => m.SalesComponent
          ),
        canActivate: [AuthGuard]
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/order/order.component').then(
            (m) => m.OrderComponent
          ),
        canActivate: [AuthGuard]
      },
    ],
  },
  { path: '**', redirectTo: '/login' }
]

