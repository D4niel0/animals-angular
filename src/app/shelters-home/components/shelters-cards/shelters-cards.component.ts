import { Component, Input } from "@angular/core";
import { AnimalShelter } from "../../../shared/models";
import { PhoneFormatPipe } from "../../../core/pipes/phone-format.pipe";

@Component({
  selector: "app-shelters-cards",
  standalone: true,
  imports: [PhoneFormatPipe],
  templateUrl: "./shelters-cards.component.html",
  styleUrl: "./shelters-cards.component.scss",
})
export class SheltersCardsComponent {
  @Input() shelter: AnimalShelter | null = null;
}
