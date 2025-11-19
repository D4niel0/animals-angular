import { Component, ViewChild } from "@angular/core";
import { SharedModuleModule } from "../../shared-module/shared-module.module";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";
import { filter } from "rxjs";
import { FooterComponent } from "../../../home/components/footer/footer.component";

@Component({
  selector: "app-shell",
  standalone: true,
  imports: [SharedModuleModule, RouterModule, FooterComponent],
  templateUrl: "./shell.component.html",
  styleUrl: "./shell.component.scss",
})
export class ShellComponent {
  @ViewChild("sidenav") sidenav!: MatSidenav;
  protected isHome = false;

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

  toggleSidenav() {
    this.sidenav.toggle();
  }

  closeSidenav() {
    this.sidenav.close();
  }
}
