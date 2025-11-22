import { Component, inject, OnInit, effect } from "@angular/core";
import { AnimalsService } from "../../../services/animals.service";
import { Animal } from "../../../shared/models";
import { CardsComponent } from "../../../shared/components/cards/cards.component";
import { CommonModule } from "@angular/common";
import { ScrollService, SavedScroll } from "../../../services/scroll.service";
import { finalize, Subscription } from "rxjs";
import { AnimalsFiltersComponent } from "../../components/animals-filters/animals-filters.component";
import {
  AnimalsFilters,
  AnimalsFiltersStore,
} from "../../../core/stores/animal-filters.store";
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: "app-animals",
  standalone: true,
  imports: [
    CommonModule,
    CardsComponent,
    AnimalsFiltersComponent,
    SkeletonModule,
  ],
  templateUrl: "./animals.component.html",
  styleUrl: "./animals.component.scss",
})
export class AnimalsComponent implements OnInit {
  private animalsService = inject(AnimalsService);
  private scrollService = inject(ScrollService);
  private filtersStore = inject(AnimalsFiltersStore);
  protected filteredAnimals: Animal[] = [];
  protected animalsList: Animal[] = [];
  protected isLoading: boolean = false;

  private filtersEffect = effect(() => {
    this.applyFilters(this.filtersStore.filtersSignal());
  });

  ngOnInit(): void {
    this.getAnimals();
  }

  /**
   * @description Fetch the list of animals and restore scroll position if available.
   * @returns
   */
  protected getAnimals(): Subscription {
    this.isLoading = true;
    return this.animalsService
      .getAnimals()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data: Animal[]) => {
        this.animalsList = data;
        this.applyFilters(this.filtersStore.getFilters());

        const saved: SavedScroll | null = this.scrollService.get("animals");

        if (saved !== null) {
          setTimeout(() => {
            if (saved.selector) {
              const el = document.querySelector<HTMLElement>(saved.selector);
              if (el) {
                el.scrollTop = saved.y;
                this.scrollService.clear("animals");
                return;
              }
            }
            window.scrollTo({ top: saved.y, behavior: "auto" });
            this.scrollService.clear("animals");
          }, 100);
        }
      });
  }

  /**
   * @description Apply the given filters to the animals list.
   * @param filters The filters to apply to the animals list.
   */
  applyFilters(filters: AnimalsFilters) {
    this.filteredAnimals = this.animalsList.filter((animal) => {
      if (filters.species.length && !filters.species.includes(animal.species))
        return false;

      if (
        animal.ageYears < filters.ageRange[0] ||
        animal.ageYears > filters.ageRange[1]
      )
        return false;

      if (filters.gender.length && !filters.gender.includes(animal.sex))
        return false;

      if (filters.size.length && !filters.size.includes(animal.size))
        return false;

      if (filters.compatibility.length) {
        if (
          filters.compatibility.includes("dog") &&
          animal.compatibleWithDogs !== true
        )
          return false;
        if (
          filters.compatibility.includes("cat") &&
          animal.compatibleWithCats !== true
        )
          return false;
        if (
          filters.compatibility.includes("child") &&
          animal.compatibleWithChildren !== true
        )
          return false;
      }

      const locs = filters.location.filter((l) => l !== "");
      if (locs.length && !locs.includes(animal.location.region)) return false;

      return true;
    });
  }
}
