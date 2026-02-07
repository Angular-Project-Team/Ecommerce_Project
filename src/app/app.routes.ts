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
];
