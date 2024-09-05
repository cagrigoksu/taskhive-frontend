import { CanActivateFn, Router } from '@angular/router';
import { inject} from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    
  const authService = inject(AuthService);
  const router = inject(Router); 
  
  if (authService.isLoggedIn())
    {
      return true;
    } 
  router.navigate(['/login']);
  return true;
};
