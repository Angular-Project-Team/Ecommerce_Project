import { Routes } from '@angular/router';
import { ProductDetails } from './features/Product Details/product-details/product-details';

export const routes: Routes = [
    { path: 'product/:id', component: ProductDetails }
];
