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
import { Animal } from "../../../shared/models";
import { TextareaModule } from "primeng/textarea";
import { AnimalsService } from "../../../services/animals.service";
import { ProfileService } from "../../../services/profile.service";
import { AnimalImagesComponent } from "../../../shared/components/animal-images/animal-images.component";
import { ToastService } from "../../../services/toast.service";
import { PawSpinnerComponent } from "../../../shared/components/paw-spinner/paw-spinner.component";
import { DatePickerModule } from "primeng/datepicker";
import { finalize } from "rxjs";
import { formatBirthdateISO } from "../../../core/utils/date-utils";

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
    AnimalImagesComponent,
    PawSpinnerComponent,
    DatePickerModule,
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
  private toastService = inject(ToastService);

  form: FormGroup;
  mode: "create" | "edit" = "create";
  animalId?: string;

  speciesList: Array<"dog" | "cat" | "other"> = ["dog", "cat", "other"];
  sizeList: Array<"small" | "medium" | "large"> = ["small", "medium", "large"];
  statusList: Array<"available" | "reserved" | "fostered"> = [
    "available",
    "reserved",
    "fostered",
  ];
  sexList: Array<"m" | "f"> = ["m", "f"];

  isSubmitting = false;
  isLoading = false;
  images: string[] = [];
  imageFiles: File[] = [];
  existingImageUrls: string[] = [];
  maxDate = new Date();

  constructor() {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(80)]],
      species: [null as "dog" | "cat" | "other" | null, [Validators.required]],
      birthday: [
        "",
        [Validators.required, Validators.min(0), Validators.max(30)],
      ],
      breed: ["", [Validators.maxLength(60)]],
      size: [
        null as "small" | "medium" | "large" | null,
        [Validators.required],
      ],
      status: ["available" as "available" | "reserved", [Validators.required]],
      sex: [null as "m" | "f" | null, [Validators.required]],

      compatibleWithDogs: ["", [Validators.required]],
      compatibleWithCats: ["", [Validators.required]],
      compatibleWithChildren: ["", [Validators.required]],

      description: ["", [Validators.required, Validators.maxLength(800)]],
      history: ["", [Validators.required, Validators.maxLength(1200)]],
      specialNeeds: ["", [Validators.maxLength(600)]],
      imageUrl: [[]],
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
      this.animalId = idParam;
      this.loadAnimalForEdit(this.animalId);
    } else {
      this.mode = "create";
    }
  }

  /**
   * @description Load animal data for editing and patch the form.
   * @param id The ID of the animal to load for editing.
   */
  private loadAnimalForEdit(id: string): void {
    this.isLoading = true;
    this.animalsService.getAnimalById(id).subscribe({
      next: (animal) => {
        if (animal) {
          this.patchForm(animal);
        }
        this.isLoading = false;
      },
    });
  }

  /**
   * @description Patch the form with the given animal data.
   * @param animal The animal data to patch the form with.
   */
  private patchForm(animal: Partial<Animal>): void {
    this.form.patchValue({
      name: animal.name ?? "",
      species: animal.species,
      birthday: animal.birthdate ?? "",
      breed: animal.breed ?? "",
      size: animal.size ?? null,
      status: animal.status ?? "available",
      sex: animal.sex ?? null,
      compatibleWithDogs: animal.compatibleWithDogs ?? null,
      compatibleWithCats: animal.compatibleWithCats ?? null,
      compatibleWithChildren: animal.compatibleWithChildren ?? null,
      description: animal.description ?? "",
      history: animal.history ?? "",
      specialNeeds: animal.specialNeeds ?? "",
      imageUrl: animal.imageUrl ?? [],
    });

    this.existingImageUrls = animal.imageUrl ?? [];
    this.images = [...this.existingImageUrls];
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
  setBooleanControl(controlName: string, value: string): void {
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
  isBooleanSelected(controlName: string, value: string): boolean {
    return this.form.get(controlName)?.value === value;
  }

  /**
   * @description Handle changes in the animal images component.
   * @param previews
   */
  onImagesChange(previews: string[]): void {
    this.images = previews;

    this.existingImageUrls = this.existingImageUrls.filter((url) =>
      previews.includes(url)
    );
  }

  /**
   * @description Handle changes in the animal images component.
   * @param files
   */
  onFilesChange(files: File[]): void {
    this.imageFiles = files;
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
    this.isLoading = true;
    const raw = this.form.value;

    const animalPayload: Omit<Animal, "id" | "imageUrl" | "location"> = {
      name: raw.name,
      species: raw.species,
      birthdate: formatBirthdateISO(raw.birthday),
      breed: raw.breed,
      size: raw.size,
      status: raw.status,
      sex: raw.sex,
      compatibleWithDogs: raw.compatibleWithDogs,
      compatibleWithCats: raw.compatibleWithCats,
      compatibleWithChildren: raw.compatibleWithChildren,
      description: raw.description,
      history: raw.history,
      specialNeeds: raw.specialNeeds ?? "",
    } as any;

    const formData = new FormData();

    formData.append(
      "animal",
      new Blob([JSON.stringify(animalPayload)], {
        type: "application/json",
      })
    );

    if (this.mode === "edit" && this.existingImageUrls.length > 0) {
      formData.append(
        "existingImages",
        new Blob([JSON.stringify(this.existingImageUrls)], {
          type: "application/json",
        })
      );
    }

    this.imageFiles.forEach((file, index) => {
      formData.append("images", file, file.name);
    });

    const request$ =
      this.mode === "create"
        ? this.profileService.createAnimal(formData)
        : this.profileService.editAnimal(this.animalId!, formData);

    request$
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: () => {
          this.toastService.success(
            `Animal ${
              this.mode === "create" ? "creado" : "editado"
            } correctamente.`,
            "Éxito"
          );
          this.animalsService.clearAnimalsCache();
          this.router.navigate(["/panel/shelter-animals"]);
        },
      });
  }
}
