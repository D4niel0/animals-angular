import { Component, Input } from "@angular/core";
import { AnimalShelter } from "../../../shared/models";

@Component({
  selector: "app-shelters-cards",
  standalone: true,
  imports: [],
  templateUrl: "./shelters-cards.component.html",
  styleUrl: "./shelters-cards.component.scss",
})
export class SheltersCardsComponent {
  @Input() shelter: AnimalShelter | null = null;
}
