import { Component, inject } from "@angular/core";
import { Router, RouterModule, NavigationEnd } from "@angular/router";
import { filter } from "rxjs";

import { FooterComponent } from "../../../home/components/footer/footer.component";
import { RevealOnScrollDirective } from "../../directives/reveal-on-scroll.directive";
import { ScrollService } from "../../../services/scroll.service";
import { AnimalsService } from "../../../services/animals.service";

import { SidebarModule } from "primeng/sidebar";
import { ButtonModule } from "primeng/button";
import { ToolbarModule } from "primeng/toolbar";
import { CommonModule } from "@angular/common";
import { ToastModule } from "primeng/toast";
import { AnimalsFiltersStore } from "../../../core/stores/animal-filters.store";
import { Menu } from "primeng/menu";
import { MenuItem } from "primeng/api";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-shell",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    RevealOnScrollDirective,
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    ToastModule,
    Menu,
  ],
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"],
})
export class ShellComponent {
  protected sidebarVisible = false;
  protected isHome = false;

  protected menuItems: MenuItem[] = [
    {
      label: "Iniciar sesión",
      routerLink: ["/login"],
    },
    {
      label: "Registro",
      routerLink: ["/register"],
    },
    {
      label: "Gestionar animales",
      routerLink: ["/panel/animals"],
    },
    {
      label: "Editar perfil",
      routerLink: ["/panel/profile"],
    },
    {
      label: "Cerrar sesión",
      command: () => this.logout(),
    },
  ];
  private scrollService = inject(ScrollService);
  private animalsService = inject(AnimalsService);
  private animalsFilterStore = inject(AnimalsFiltersStore);
  private authService = inject(AuthService);

  constructor(private router: Router) {
    this.isHome = this.checkIsHome(this.router.url);

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((ev) => {
        this.isHome = this.checkIsHome(ev.urlAfterRedirects);
      });
  }

  private checkIsHome(url: string): boolean {
    return url === "/home" || url === "/";
  }

  protected toggleSidenav(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  protected closeSidenav(): void {
    this.sidebarVisible = false;
  }

  protected clear(): void {
    this.scrollService.clear("animals");
    this.animalsService.clearAnimalsCache();
    this.animalsFilterStore.resetFilters();
  }

  protected logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem("myShelter");
        localStorage.removeItem("token");
        this.router.navigate(["/home"]);
      },
    });
  }
}
