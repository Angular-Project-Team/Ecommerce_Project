import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (localStorage.getItem('userToken')) {
    return router.parseUrl('/home');
  } else {
    return true;
  }
};
