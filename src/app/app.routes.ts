import { Routes , RouterModule } from '@angular/router';
import { ProductDetails } from './features/product-details/product-details';
import { Home } from './features/Home/home';
import { Shopping } from './features/shopping/shopping';
import { Favourite } from './features/favourite/favourite';
import { BestSeller } from './features/Home/Components/best-seller/best-seller';
import { Cart } from './features/cart/cart';
export const routes: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: 'home', component: Home },
    // { path: 'products', component: Products },
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home', component: Home},
  {path:'shopping', component: Shopping},
  {path:'favourite', component: Favourite},
  {path:'cart', component: Cart},
  { path: 'product/:id', component: ProductDetails }
];
