<<<<<<< HEAD
import { Routes } from '@angular/router';
import { ProductDetails } from './features/product-details/product-details';
import { Home } from './features/Home/home';
import { Products } from './features/Home/Components/products/products';
export const routes: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: 'home', component: Home },
    // { path: 'products', component: Products },
    { path: 'products/:id', component: ProductDetails }
=======
import { RouterModule, Routes } from '@angular/router';
import { Home } from './features/Home/home';
import { Shopping } from './features/shopping/shopping';
import { BestSeller } from './features/Home/Components/best-seller/best-seller';
import { Favourite } from './features/favourite/favourite';


export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home', component: Home},
  {path:'shopping', component: Shopping},
  {path:'favourite', component: Favourite},

  // {path:'product/:id', component: ProductDetails},

  // {path:'**',component:Error},
>>>>>>> origin/Home
];
