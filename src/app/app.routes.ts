import { RouterModule, Routes } from '@angular/router';


  export const routes: Routes = [


  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '', // Home routes
    loadComponent: () =>
      import('./layouts/home-layout/home-layout').then(m => m.HomeLayout),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/Home/home').then(m => m.Home)
      }
    ]
  },
  {
    path: '', // Blank layout routes
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout').then(m => m.BlankLayout),
    children: [
      {
        path: 'shopping',
        loadComponent: () =>
          import('./features/shopping/shopping').then(m => m.Shopping)
      },
      {
        path: 'favourite',
        loadComponent: () =>
          import('./features/favourite/favourite').then(m => m.Favourite)
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./features/product-details/product-details').then(m => m.ProductDetails)
      },
      {
        path : 'cart',
        loadComponent: () =>
          import('./features/cart/cart').then(m => m.Cart)
      },
      {
        path : 'checkout',
        loadComponent: () =>
          import('./features/checkout/checkout').then(m => m.Checkout)
      },
      {
        path: 'user-profile',
        loadComponent: () =>
          import('./features/user-profile/user-profile').then(m => m.UserProfile),
        children: [
          { path: '', redirectTo: 'account-details', pathMatch: 'full' },
          {
            path: 'account-details',
            loadComponent: () =>
              import('./features/user-profile/components/account-details/account-details')
                .then(m => m.AccountDetails)
          },
          {
            path: 'saved-payment',
            loadComponent: () =>
              import('./features/user-profile/components/saved-payment/saved-payment')
                .then(m => m.SavedPayment)
          },
          {
            path: 'orders',
            loadComponent: () =>
              import('./features/user-profile/components/orders/orders')
                .then(m => m.Orders)
          }
        ]
      }
    ]
  },
  {
    path: '', // Auth routes
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout').then(m => m.AuthLayout),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login').then(m => m.Login)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./auth/register/register').then(m => m.Register)
      }
    ]
  },
  { path: '**', redirectTo: 'home' }
  ];

