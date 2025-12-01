import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLogged = authService.isAuthenticated();

  if (!isLogged) {
    router.navigate(["/login"]);
    return false;
  }

  return true;
};
