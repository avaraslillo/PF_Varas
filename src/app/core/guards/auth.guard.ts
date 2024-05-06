import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServicioAuthService } from '../services/servicio-auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(ServicioAuthService);

  const isAuth = authService.verifyToken();

  return isAuth || router.createUrlTree(['auth']);
};
