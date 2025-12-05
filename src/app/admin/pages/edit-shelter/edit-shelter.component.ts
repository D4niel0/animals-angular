import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { InputSwitchModule } from "primeng/inputswitch";
import { ToastService } from "../../../services/toast.service";
import { AnimalShelter } from "../../../shared/models";
import { finalize } from "rxjs";
import { PawSpinnerComponent } from "../../../shared/components/paw-spinner/paw-spinner.component";
import { AdminService } from "../../../services/admin.service";

@Component({
  selector: "app-edit-shelter",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputSwitchModule,
    PawSpinnerComponent,
  ],
  templateUrl: "./edit-shelter.component.html",
  styleUrl: "./edit-shelter.component.scss",
})
export class EditShelterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);
  private adminService = inject(AdminService);

  protected shelterForm!: FormGroup;
  protected isLoading = false;
  protected isSaving = false;
  protected shelterId: string = "";

  ngOnInit(): void {
    this.initializeForm();
    this.loadShelterData();
  }

  /**
   * @description Inicializar formulario
   */
  private initializeForm(): void {
    this.shelterForm = this.fb.group({
      legalName: ["", [Validators.required, Validators.minLength(3)]],
      contactEmail: ["", [Validators.required, Validators.email]],
      contactPhone: [""],
      addressCity: [""],
      addressProvince: [""],
      facebook: [""],
      instagram: [""],
      website: [""],
      taxId: [""],
      registryNumber: [""],
      responsibleFullName: [""],
      responsibleRole: [""],
      isApproved: [false],
    });
  }

  /**
   * @description Cargar datos del shelter desde la ruta
   */
  private loadShelterData(): void {
    this.isLoading = true;
    this.shelterId = this.route.snapshot.paramMap.get("id") || "";

    if (!this.shelterId) {
      this.toastService.error("ID de protectora no válido");
      this.goBack();
      return;
    }

    // Obtener shelter por ID
    this.adminService
      .getShelterById(this.shelterId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (shelter: AnimalShelter) => {
          if (shelter) {
            this.patchFormValues(shelter);
          } else {
            this.toastService.error("Protectora no encontrada");
            this.goBack();
          }
        },
        error: () => {
          this.toastService.error("Error al cargar los datos de la protectora");
          this.goBack();
        },
      });
  }

  /**
   * @description Rellenar formulario con datos del shelter
   */
  private patchFormValues(shelter: AnimalShelter): void {
    this.shelterForm.patchValue({
      legalName: shelter.legalName,
      contactEmail: shelter.contactEmail,
      contactPhone: shelter.contactPhone || "",
      addressCity: shelter.addressCity || "",
      addressProvince: shelter.addressProvince || "",
      facebook: shelter.facebook || "",
      instagram: shelter.instagram || "",
      website: shelter.website || "",
      taxId: shelter.taxId || "",
      registryNumber: shelter.registryNumber || "",
      responsibleFullName: shelter.responsibleFullName || "",
      responsibleRole: shelter.responsibleRole || "",
      isApproved: shelter.isApproved || false,
    });
  }

  /**
   * @description Guardar cambios
   */
  protected onSave(): void {
    if (this.shelterForm.invalid) {
      this.shelterForm.markAllAsTouched();
      this.toastService.error(
        "Por favor, completa todos los campos requeridos"
      );
      return;
    }

    this.isSaving = true;

    const formValues = this.shelterForm.value;
    const updatedShelter: Partial<AnimalShelter> = Object.keys(formValues)
      .filter(
        (key) =>
          formValues[key] !== "" &&
          formValues[key] !== null &&
          formValues[key] !== undefined
      )
      .reduce((obj, key) => {
        obj[key as keyof AnimalShelter] = formValues[key];
        return obj;
      }, {} as Partial<AnimalShelter>);

    this.adminService
      .updateShelter(this.shelterId, updatedShelter)
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => {
          this.toastService.success("Protectora actualizada correctamente");
          this.goBack();
        },
        error: () => {
          this.toastService.error("Error al actualizar la protectora");
        },
      });
  }

  /**
   * @description Volver atrás
   */
  protected goBack(): void {
    this.router.navigate(["/admin/shelter-admin"]);
  }

  /**
   * @description Verificar si un campo tiene error
   */
  protected hasError(field: string): boolean {
    const control = this.shelterForm.get(field);
    return !!(control?.invalid && control?.touched);
  }

  /**
   * @description Obtener mensaje de error
   */
  protected getErrorMessage(field: string): string {
    const control = this.shelterForm.get(field);
    if (control?.hasError("required")) return "Este campo es obligatorio";
    if (control?.hasError("email")) return "Email no válido";
    if (control?.hasError("minlength"))
      return `Mínimo ${control.errors?.["minlength"].requiredLength} caracteres`;
    return "";
  }
}
