import { Component, inject } from "@angular/core";
import { ShelterAnimals } from "../../../shared/models";
import { ProfileService } from "../../../services/profile.service";
import { finalize } from "rxjs";
import { ShelterAnimalsTableComponent } from "../../components/shelter-animals-table/shelter-animals-table.component";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-shelter-animals",
  standalone: true,
  imports: [ShelterAnimalsTableComponent, ButtonModule],
  templateUrl: "./shelter-animals.component.html",
  styleUrl: "./shelter-animals.component.scss",
})
export class ShelterAnimalsComponent {
  protected animals: ShelterAnimals[] = [];
  protected isLoading = false;
  private profileService = inject(ProfileService);

  constructor() {
    this.getShelterAnimals();
  }

  /**
   * @description Fetch shelter animals from the ProfileService
   */
  getShelterAnimals(): void {
    this.isLoading = true;
    this.profileService
      .getShelterAnimals()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (animals) => {
          this.animals = animals;
        },
      });
  }
}
