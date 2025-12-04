import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  UrlTree,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { environment } from "../../../environments/environment.development";

@Injectable({ providedIn: "root" })
export class MaintenanceGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isMaintenance = environment.maintenance;

    if (!isMaintenance) {
      if (state.url.startsWith("/maintenance")) {
        return this.router.parseUrl("/home"); // o lo que quieras
      }
      return true; // funcionamiento normal
    }

    if (state.url.startsWith("/maintenance")) {
      return true;
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") === "8888") {
      return true;
    }

    return this.router.parseUrl("/maintenance");
  }
}
