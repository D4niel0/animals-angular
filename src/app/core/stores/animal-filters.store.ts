import { Injectable, signal } from "@angular/core";

export interface AnimalsFilters {
  species: string[];
  size: string[];
  gender: string[];
  compatibility: string[];
  ageRangeStart: number;
  ageRangeEnd: number;
  location: string[];
}

@Injectable({ providedIn: "root" })
export class AnimalsFiltersStore {
  filtersSignal = signal<AnimalsFilters>({
    species: [],
    size: [],
    gender: [],
    compatibility: [],
    ageRangeStart: 0,
    ageRangeEnd: 20,
    location: [],
  });

  /**
   * @description Set new filters.
   * @param filters The new filters to set.
   */
  setFilters(filters: AnimalsFilters) {
    this.filtersSignal.set(filters);
  }

  /**
   * @description Get the current filters.
   * @returns The current filters.
   */
  getFilters(): AnimalsFilters {
    return this.filtersSignal();
  }

  /**
   * @description Reset filters to default values.
   */
  resetFilters() {
    this.filtersSignal.set({
      species: [],
      size: [],
      gender: [],
      compatibility: [],
      ageRangeStart: 0,
      ageRangeEnd: 20,
      location: [],
    });
  }
}
