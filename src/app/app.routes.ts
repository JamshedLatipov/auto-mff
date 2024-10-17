import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'detail/:id', loadComponent: () => import('./pages/detail/detail.component').then((m) => m.DetailComponent) }
];
