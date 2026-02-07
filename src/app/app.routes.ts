import { Routes } from '@angular/router';
import { ProductDetails } from './features/product-details/product-details';
import { Home } from './features/Home/home';
import { Products } from './features/Home/Components/products/products';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'products', component: Products },
    { path: 'products/:id', component: ProductDetails }
];
