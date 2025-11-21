import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { Observable, switchMap, map } from "rxjs";
import { AnimalsService } from "../../../services/animals.service";
import { Animal } from "../../../shared/models";
import { SliderComponent } from "../../../shared/components/slider/slider.component";
import { AnimalContactFormComponent } from "../animal-contact-form/animal-contact-form.component";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-animal-detail",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SliderComponent,
    AnimalContactFormComponent,
    ButtonModule,
  ],
  templateUrl: "./animal-detail.component.html",
})
export class AnimalDetailComponent {
  animal$!: Observable<Animal | null>;
  showContactForm = false;

  constructor(
    private route: ActivatedRoute,
    private animalsService: AnimalsService
  ) {
    this.animal$ = this.route.paramMap.pipe(
      map((params) => Number(params.get("id"))),
      switchMap((id) => this.animalsService.getAnimalById(id))
    );
  }

  /**
   * @description Returns a label for the animal size.
   * @param size The size of the animal.
   * @returns A string label representing the size.
   */
  protected getSizeLabel(size: Animal["size"]): string {
    switch (size) {
      case "small":
        return "Pequeño";
      case "medium":
        return "Mediano";
      case "large":
        return "Grande";
      default:
        return "";
    }
  }

  /**
   * @description Toggles the visibility of the contact form.
   */
  protected toggleContactForm(): void {
    this.showContactForm = !this.showContactForm;
  }
}
