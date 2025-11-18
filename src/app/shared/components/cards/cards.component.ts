import { Component, inject, Input } from "@angular/core";
import { Animal } from "../../models";
import { SharedModuleModule } from "../../shared-module/shared-module.module";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";

@Component({
  selector: "app-cards",
  standalone: true,
  imports: [SharedModuleModule, MatIconModule],
  templateUrl: "./cards.component.html",
  styleUrl: "./cards.component.scss",
})
export class CardsComponent {
  @Input() animal: Animal | null = null;
  private router = inject(Router);

  goToDetails(id: number | undefined): void {
    this.router.navigateByUrl("/animals-home/" + id);
  }
}
