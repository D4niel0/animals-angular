import { Component, inject, OnInit } from "@angular/core";
import { SheltersService } from "../../../services/shelters.service";
import { AnimalShelter } from "../../../shared/models";
import { finalize } from "rxjs";
import { CommonModule } from "@angular/common";
import { SkeletonModule } from "primeng/skeleton";
import { SheltersCardsComponent } from "../../components/shelters-cards/shelters-cards.component";
import { MultiSelectModule } from "primeng/multiselect";
import { PROVINCES } from "../../../core/constants/provinces.const";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-shelters",
  standalone: true,
  imports: [
    CommonModule,
    SkeletonModule,
    SheltersCardsComponent,
    MultiSelectModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: "./shelters.component.html",
  styleUrl: "./shelters.component.scss",
})
export class SheltersComponent implements OnInit {
  private sheltersService = inject(SheltersService);
  protected sheltersList: any[] = [];
  protected filteredShelters: any[] = [];
  protected isLoading: boolean = false;
  readonly PROVINCES_LIST = PROVINCES;
  protected provincesOptions = this.PROVINCES_LIST.map((p) => ({
    label: p,
    value: p,
  }));
  protected selectedProvinces: string[] = [];

  ngOnInit(): void {
    this.getShelters();
  }

  /**
   * @description Fetch the list of shelters from the service.
   */
  protected getShelters(): void {
    this.isLoading = true;
    this.sheltersService
      .getShelters()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data: AnimalShelter[]) => {
        this.sheltersList = data;
        this.filteredShelters = data;
      });
  }

  /**
   * @description Handle changes in the selected provinces for filtering shelters.
   * @param selectedProvinces The list of selected provinces to filter shelters by.
   */
  protected onProvinceChange(selectedProvinces: string[]): void {
    if (selectedProvinces.length === 0) {
      this.filteredShelters = this.sheltersList;
    } else {
      this.filteredShelters = this.sheltersList.filter((shelter) =>
        selectedProvinces.includes(shelter.address.province)
      );
    }
  }

  /**
   * @description Reset the province filters and show all shelters.
   */
  protected resetFilters(): void {
    this.filteredShelters = this.sheltersList;
    this.selectedProvinces = [];
  }
}
