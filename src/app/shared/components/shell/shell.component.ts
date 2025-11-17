import { Component, ViewChild } from "@angular/core";
import { SharedModuleModule } from "../../shared-module/shared-module.module";
import { RouterModule } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: "app-shell",
  standalone: true,
  imports: [SharedModuleModule, RouterModule],
  templateUrl: "./shell.component.html",
  styleUrl: "./shell.component.scss",
})
export class ShellComponent {
  @ViewChild("sidenav") sidenav!: MatSidenav;
  sidenavOpened = false;

  toggleSidenav() {
    this.sidenav.toggle();
    this.sidenavOpened = !this.sidenavOpened;
  }

  closeSidenav() {
    this.sidenav.close();
    this.sidenavOpened = false;
  }
}
