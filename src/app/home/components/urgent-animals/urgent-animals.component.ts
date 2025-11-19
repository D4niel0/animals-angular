import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { CardsComponent } from "../../../shared/components/cards/cards.component";
import { AnimalsService } from "../../../services/animals.service";
import { Animal } from "../../../shared/models";

@Component({
  selector: "app-urgent-animals",
  standalone: true,
  imports: [CommonModule, CardsComponent],
  templateUrl: "./urgent-animals.component.html",
  styleUrl: "./urgent-animals.component.scss",
})
export class UrgentAnimalsComponent {
  private animalsService = inject(AnimalsService);

  protected animalsList: Animal[] = [];

  ngOnInit(): void {
    this.getAnimals();
  }

  getAnimals() {
    return this.animalsService
      .getUrgentAnimals()
      .subscribe((data: Animal[]) => {
        this.animalsList = data;
      });
  }
}
