import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

// Lottie
import { provideLottieOptions } from "ngx-lottie";

// PrimeNG v18 theming
import { providePrimeNG } from "primeng/config";
import Aura from "@primeuix/themes/aura";
import { MessageService } from "primeng/api";
import { PRIMENG_ES } from "../assets/i18n/primeng-es";
import { ErrorInterceptor } from "./core/interceptors/error.interceptor";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([ErrorInterceptor, AuthInterceptor])),
    provideLottieOptions({
      player: () => import("lottie-web"),
    }),

    // <-- PrimeNG provider: Aura preset + palette 'lime' + surface 'slate'
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          palette: "lime",
          surface: "slate",
          prefix: "p",
          darkModeSelector: ".dark",
        },
      },
      translation: PRIMENG_ES,
    }),
    MessageService,
  ],
};
