import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectAuthState } from '../../featured/auth/store/auth.selector';
import { ServicioAuthService } from '../services/servicio-auth.service';


export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(ServicioAuthService);
  const router = inject(Router);
  const authState$=inject(Store).select(selectAuthState);
  return authState$.pipe(
    take(1),
    map(authState=> {
      if (authState.user === null) {
        router.navigate(['/auth']);
        return false;
      }
      return true;
    })
  );
};



