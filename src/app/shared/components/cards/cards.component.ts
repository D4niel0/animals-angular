import { Component, Input } from "@angular/core";
import { Animal } from "../../models";
import { SharedModuleModule } from "../../shared-module/shared-module.module";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-cards",
  standalone: true,
  imports: [SharedModuleModule, MatIconModule],
  templateUrl: "./cards.component.html",
  styleUrl: "./cards.component.scss",
})
export class CardsComponent {
  @Input() animal: Animal | null = null;
}
