import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user-profile',
        loadComponent: () => import('./features/user-profile/user-profile').then(m => m.UserProfile),
        children: [
            { path: '', redirectTo: 'account-details', pathMatch: 'full' },
            { path: 'account-details', loadComponent: () => import('./features/user-profile/components/account-details/account-details').then(m => m.AccountDetails) },
            { path: 'saved-payment', loadComponent: () => import('./features/user-profile/components/saved-payment/saved-payment').then(m => m.SavedPayment) },
            { path: 'orders', loadComponent: () => import('./features/user-profile/components/orders/orders').then(m => m.Orders) }
        ]
    },
    { path: '**', redirectTo: 'user-profile', pathMatch: 'full' }
];
