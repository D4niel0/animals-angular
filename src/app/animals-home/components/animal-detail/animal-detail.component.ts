import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import {
  Observable,
  switchMap,
  map,
  of,
  finalize,
  takeUntil,
  Subject,
} from "rxjs";
import { AnimalsService } from "../../../services/animals.service";
import { Animal } from "../../../shared/models";
import { SliderComponent } from "../../../shared/components/slider/slider.component";
import { AnimalContactFormComponent } from "../animal-contact-form/animal-contact-form.component";
import { ButtonModule } from "primeng/button";
import { PawSpinnerComponent } from "../../../shared/components/paw-spinner/paw-spinner.component";
import { ShareButtonComponent } from "../../../shared/components/share-button/share-button.component";

@Component({
  selector: "app-animal-detail",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SliderComponent,
    AnimalContactFormComponent,
    ButtonModule,
    PawSpinnerComponent,
    ShareButtonComponent,
  ],
  templateUrl: "./animal-detail.component.html",
})
export class AnimalDetailComponent implements OnInit {
  protected animal: Animal | null = null;
  protected showContactForm = false;
  protected isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animalsService: AnimalsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.loadAnimal(id);
      } else {
        this.router.navigate(["/animals-home"]);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  private loadAnimal(id: string): void {
    this.isLoading = true;
    this.animalsService
      .getAnimalById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (animal) => {
          this.animal = animal;
          this.isLoading = false;
        },
        error: (error) => {
          console.error("Error loading animal:", error);
          this.isLoading = false;
          this.router.navigate(["/animals-home"]);
        },
      });
  }
}
