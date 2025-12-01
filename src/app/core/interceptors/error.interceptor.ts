import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { ToastService } from "../../services/toast.service";
import { AuthService } from "../../services/auth.service";
import { catchError, throwError } from "rxjs";

export const ErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      let errorMsg = "";

      if (error.error instanceof ErrorEvent) {
        console.log("error", error);
        console.log("This is client side error");
        errorMsg = `Error: ${error.error?.message}`;
      } else {
        console.log("error", error);
        console.log("This is server side error");
        if (error.error?.message) {
          errorMsg = `${error.error?.message}`;
        } else {
          errorMsg = "Error inesperado";
        }

        toastService.error(errorMsg, "Error");

        if (error.status === 401) {
          authService.logout();
          router.navigate(["/login"]);
        }
      }

      return throwError(() => new Error(errorMsg));
    })
  );
};
