import { Component, Input } from "@angular/core";
import { Animal } from "../../../shared/models";

@Component({
  selector: "app-cards",
  standalone: true,
  imports: [],
  templateUrl: "./cards.component.html",
  styleUrl: "./cards.component.scss",
})
export class CardsComponent {
  @Input() animal: Animal | null = null;
}
