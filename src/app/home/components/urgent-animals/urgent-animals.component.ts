import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { CardsComponent } from "../../../shared/components/cards/cards.component";
import { AnimalsService } from "../../../services/animals.service";
import { Animal } from "../../../shared/models";
import { finalize, Subscription } from "rxjs";
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: "app-urgent-animals",
  standalone: true,
  imports: [CommonModule, CardsComponent, SkeletonModule],
  templateUrl: "./urgent-animals.component.html",
  styleUrl: "./urgent-animals.component.scss",
})
export class UrgentAnimalsComponent {
  private animalsService = inject(AnimalsService);

  protected animalsList: Animal[] = [];
  protected isLoading: boolean = true;

  ngOnInit(): void {
    this.getAnimals();
  }

  /**
   * @description Get urgent animals
   * @returns Subscription
   */
  protected getAnimals(): Subscription {
    return this.animalsService
      .getUrgentAnimals()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data: Animal[]) => {
        this.animalsList = data;
      });
  }
}
