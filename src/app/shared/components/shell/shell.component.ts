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
  ],
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"],
})
export class ShellComponent {
  sidebarVisible = false;
  protected isHome = false;

  private scrollService = inject(ScrollService);
  private animalsService = inject(AnimalsService);
  private animalsFilterStore = inject(AnimalsFiltersStore);
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
}
