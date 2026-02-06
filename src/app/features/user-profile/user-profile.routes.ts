import { Routes } from '@angular/router';

export const userProfileRoutes: Routes = [
    { path: '', redirectTo: 'account-details', pathMatch: 'full' },
    { path: 'account-details', loadComponent: () => import('./components/account-details/account-details').then(m => m.AccountDetails) },
    { path: 'saved-payment', loadComponent: () => import('./components/saved-payment/saved-payment').then(m => m.SavedPayment) },
    { path: 'orders', loadComponent: () => import('./components/orders/orders').then(m => m.Orders) },
    { path: '**', redirectTo: 'account-details' }
];
