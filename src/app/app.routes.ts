import { RouterModule, Routes } from '@angular/router';
import { Home } from './features/Home/home';
import { Shopping } from './features/shopping/shopping';
import { BestSeller } from './features/Home/Components/best-seller/best-seller';


export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home', component: Home},
  {path:'shopping', component: Shopping},

  // {path:'product/:id', component: ProductDetails},

  {path:'**',component:Error},
];
