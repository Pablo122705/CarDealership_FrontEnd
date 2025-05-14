import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter Page',
      urls: [
        { title: 'CarDealership', url: '/CarDealership/CarDealership1' },
        { title: 'Starter Page' },
      ],
    },
  },
];
