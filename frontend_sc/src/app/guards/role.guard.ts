import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    take(1),
    map(isLoggedIn => {
      if (!isLoggedIn) {
        return router.createUrlTree(['/login']);
      }

      const requiredRoles = route.data['roles'] as Array<string>;
      const userType = authService.getUserType();

      if (!requiredRoles || requiredRoles.length === 0) {
        return true; // Se não há roles específicos, apenas precisa estar logado
      }

      if (!userType) {
        return router.createUrlTree(['/login']);
      }

      // Verificar se o usuário tem permissão
      const hasPermission = requiredRoles.some(role => 
        authService.hasPermission(role as 'Admin' | 'Instrutor' | 'Aluno')
      );

      if (hasPermission) {
        return true;
      } else {
        // Redirecionar para página de acesso negado ou dashboard apropriado
        return router.createUrlTree(['/acesso-negado']);
      }
    })
  );
};