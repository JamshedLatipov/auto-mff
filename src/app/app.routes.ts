import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'detail', redirectTo: '/' },
    { path: 'detail/:id', loadComponent: () => import('./pages/detail/detail.component').then((m) => m.DetailComponent) },
    { path: '', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
];
