import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from "primeng/button";
import { Animal } from "../../../shared/models"; // ajusta ruta
import { TextareaModule } from "primeng/textarea";
import { AnimalsService } from "../../../services/animals.service";
import { ProfileService } from "../../../services/profile.service";

@Component({
  selector: "app-shelter-animal-form-page",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    ButtonModule,
    RouterModule,
  ],
  templateUrl: "./shelter-animal-form-page.component.html",
  styleUrl: "./shelter-animal-form-page.component.scss",
})
export class ShelterAnimalFormPageComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private animalsService = inject(AnimalsService);
  private profileService = inject(ProfileService);

  form: FormGroup;
  mode: "create" | "edit" = "create";
  animalId?: number;

  speciesList: Array<"dog" | "cat" | "other"> = ["dog", "cat", "other"];
  sizeList: Array<"small" | "medium" | "large"> = ["small", "medium", "large"];
  statusList: Array<"available" | "reserved"> = ["available", "reserved"];
  sexList: Array<"m" | "f"> = ["m", "f"];

  isSubmitting = false;
  isLoading = false;

  constructor() {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(80)]],
      species: [null as "dog" | "cat" | "other" | null, [Validators.required]],
      ageYears: [
        0,
        [Validators.required, Validators.min(0), Validators.max(30)],
      ],
      size: [
        null as "small" | "medium" | "large" | null,
        [Validators.required],
      ],
      status: ["available" as "available" | "reserved", [Validators.required]],
      sex: [null as "m" | "f" | null, [Validators.required]],

      compatibleWithDogs: [null as boolean | null, [Validators.required]],
      compatibleWithCats: [null as boolean | null, [Validators.required]],
      compatibleWithChildren: [null as boolean | null, [Validators.required]],

      description: ["", [Validators.required, Validators.maxLength(800)]],
      history: ["", [Validators.required, Validators.maxLength(1200)]],
      specialNeeds: ["", [Validators.maxLength(600)]],
      // imageUrl: [[]]
    });

    this.initMode();
  }

  /**
   * @description Initialize the form mode (create or edit) based on route parameters.
   */
  private initMode(): void {
    const idParam = this.route.snapshot.paramMap.get("id");

    if (idParam) {
      this.mode = "edit";
      this.animalId = Number(idParam);
      this.loadAnimalForEdit(this.animalId);
    } else {
      this.mode = "create";
    }
  }

  /**
   * @description Load animal data for editing and patch the form.
   * @param id The ID of the animal to load for editing.
   */
  private loadAnimalForEdit(id: number): void {
    this.isLoading = true;
    this.animalsService.getAnimalById(id).subscribe({
      next: (animal) => {
        if (animal) {
          this.patchForm(animal);
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });

    const mock: Partial<Animal> = {
      id,
      name: "Mocky",
      species: "dog",
      ageYears: 3,
      size: "medium",
      status: "available",
      sex: "m",
      compatibleWithDogs: true,
      compatibleWithCats: false,
      compatibleWithChildren: true,
      description: "Perrete muy bueno.",
      history: "Rescatado de la calle.",
      specialNeeds: "",
      imageUrl: [
        "https://placedog.net/500/400?id=12",
        "https://placedog.net/500/400?id=42",
      ],
    };

    this.patchForm(mock);
    this.isLoading = false;
  }

  /**
   * @description Patch the form with the given animal data.
   * @param animal The animal data to patch the form with.
   */
  private patchForm(animal: Partial<Animal>): void {
    this.form.patchValue({
      name: animal.name ?? "",
      species: animal.species,
      ageYears: animal.ageYears ?? 0,
      size: animal.size ?? null,
      status: animal.status ?? "available",
      sex: animal.sex ?? null,
      compatibleWithDogs:
        typeof animal.compatibleWithDogs === "boolean"
          ? animal.compatibleWithDogs
          : null,
      compatibleWithCats:
        typeof animal.compatibleWithCats === "boolean"
          ? animal.compatibleWithCats
          : null,
      compatibleWithChildren:
        typeof animal.compatibleWithChildren === "boolean"
          ? animal.compatibleWithChildren
          : null,
      description: animal.description ?? "",
      history: animal.history ?? "",
      specialNeeds: animal.specialNeeds ?? "",
    });
  }

  /**
   * @description Set the value of a chip form control.
   * @param controlName The name of the form control to set the value for.
   * @param value The value to set for the form control.
   */
  setChipValue(controlName: string, value: any): void {
    this.form.get(controlName)?.setValue(value);
    this.form.get(controlName)?.markAsDirty();
    this.form.get(controlName)?.markAsTouched();
  }

  /**
   * @description Set the value of a boolean form control.
   * @param controlName The name of the form control to set the value for.
   * @param value The boolean value to set for the form control.
   */
  setBooleanControl(controlName: string, value: boolean): void {
    this.form.get(controlName)?.setValue(value);
    this.form.get(controlName)?.markAsDirty();
    this.form.get(controlName)?.markAsTouched();
  }

  /**
   * @description Check if a chip form control has the specified value.
   * @param controlName The name of the form control to check the value for.
   * @param value
   * @returns
   */
  isChipSelected(controlName: string, value: any): boolean {
    return this.form.get(controlName)?.value === value;
  }

  /**
   * @description Check if a boolean form control has the specified value.
   * @param controlName
   * @param value
   * @returns
   */
  isBooleanSelected(controlName: string, value: boolean): boolean {
    return this.form.get(controlName)?.value === value;
  }

  /**
   * @description Handle form submission for creating or editing an animal.
   * @returns
   */
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const raw = this.form.value;

    const payload: Animal = {
      id: this.animalId!,
      name: raw.name as string,
      species: raw.species as "dog" | "cat" | "other",
      ageYears: raw.ageYears as number,
      size: raw.size as "small" | "medium" | "large",
      status: raw.status as "available" | "reserved",
      sex: raw.sex as "m" | "f",
      compatibleWithDogs: raw.compatibleWithDogs as boolean,
      compatibleWithCats: raw.compatibleWithCats as boolean,
      compatibleWithChildren: raw.compatibleWithChildren as boolean,
      description: raw.description as string,
      history: raw.history as string,
      specialNeeds: (raw.specialNeeds ?? "") as string,
      imageUrl: [],
    };

    const request$ =
      this.mode === "create"
        ? this.profileService.createAnimal(payload)
        : this.profileService.editAnimal(payload);

    // request$.subscribe({
    //   next: () => {
    //     this.isSubmitting = false;
    //     this.router.navigate(['/panel/shelter-animals']);
    //   },
    //   error: () => {
    //     this.isSubmitting = false;
    //   },
    // });

    console.log("Payload enviado", payload, "mode", this.mode);
    this.isSubmitting = false;
    this.router.navigate(["/panel/shelter-animals"]);
  }
}
