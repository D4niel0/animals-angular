import { Component, inject } from "@angular/core";
import { AnimalsFiltersStore } from "../../../core/stores/animal-filters.store";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-species-buttons",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./species-buttons.component.html",
  styleUrl: "./species-buttons.component.scss",
})
export class SpeciesButtonsComponent {
  private animalsFilterStore = inject(AnimalsFiltersStore);

  protected setSpeciesFilter(species: string): void {
    this.animalsFilterStore.setFilters({
      ...this.animalsFilterStore.getFilters(),
      species: [species],
    });
  }
}
