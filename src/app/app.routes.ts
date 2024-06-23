import { Routes } from '@angular/router';

const nameApp = 'Prueba NTT DATA';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    title: `Inicio | ${nameApp}`,
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'user-info',
    title: `Información | ${nameApp}`,
    loadComponent: () => import('./pages/user-info/user-info.component'),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
  },
];
