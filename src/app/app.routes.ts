import { Routes } from '@angular/router';
import { ProductDetails } from './features/product-details/product-details';
import { Home } from './features/Home/home';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'product/:id', component: ProductDetails }
];
