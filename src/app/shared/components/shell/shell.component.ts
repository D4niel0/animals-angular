import { Component, inject, ViewChild } from "@angular/core";
import { SharedModuleModule } from "../../shared-module/shared-module.module";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";
import { filter } from "rxjs";
import { FooterComponent } from "../../../home/components/footer/footer.component";
import { RevealOnScrollDirective } from "../../directives/reveal-on-scroll.directive";
import { ScrollService } from "../../../services/scroll.service";

@Component({
  selector: "app-shell",
  standalone: true,
  imports: [
    SharedModuleModule,
    RouterModule,
    FooterComponent,
    RevealOnScrollDirective,
  ],
  templateUrl: "./shell.component.html",
  styleUrl: "./shell.component.scss",
})
export class ShellComponent {
  @ViewChild("sidenav") sidenav!: MatSidenav;
  protected isHome = false;
  private scrollService = inject(ScrollService);

  constructor(private router: Router) {
    this.isHome = this.checkIsHome(this.router.url);

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((ev) => {
        this.isHome = this.checkIsHome(ev.urlAfterRedirects);
      });
  }

  /**
   * @description Check if the current route is home
   * @param url
   * @returns
   */
  private checkIsHome(url: string): boolean {
    return url === "/home" || url === "/";
  }

  /**
   * @description Toggle the sidenav
   */
  protected toggleSidenav(): void {
    this.sidenav.toggle();
  }

  /**
   * @description Close the sidenav
   */
  protected closeSidenav(): void {
    this.sidenav.close();
  }

  /**
   * @description Clear saved scroll position for animals page
   */
  protected clearScroll(): void {
    this.scrollService.clear("animals");
  }
}
