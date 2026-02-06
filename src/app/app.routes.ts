import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user-profile',
        loadComponent: () => import('./features/user-profile/user-profile').then(m => m.UserProfile),
        loadChildren: () => import('./features/user-profile/user-profile.routes').then(m => m.userProfileRoutes)
    },
    { path: '**', redirectTo: 'user-profile', pathMatch: 'full' }
];
