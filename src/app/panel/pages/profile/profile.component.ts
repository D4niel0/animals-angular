import { Component, inject } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from "@angular/forms";
import { finalize } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { ToastService } from "../../../services/toast.service";
import { ShelterUpdateProfile } from "../../../shared/models";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ProfileService } from "../../../services/profile.service";
import { PawSpinnerComponent } from "../../../shared/components/paw-spinner/paw-spinner.component";
import { PasswordModule } from "primeng/password";
import { ControlPasswordComponent } from "../../../shared/components/control-password/control-password.component";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    PawSpinnerComponent,
    PasswordModule,
    ControlPasswordComponent,
    TooltipModule,
  ],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent {
  private toastService = inject(ToastService);
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);
  protected isLoading: boolean = false;
  protected isLoadingPassword: boolean = false;
  protected shelterForm: FormGroup = new FormGroup({});
  protected passwordForm: FormGroup = new FormGroup({});
  protected shelterId: string = localStorage.getItem("shelterId") || "";
  constructor(private fb: FormBuilder) {
    this.initializeForms();
    this.getShelterProfile();
  }

  /**
   * @description Initialize the registration form with validation
   */
  protected initializeForms(): void {
    this.shelterForm = this.fb.group({
      id: [{ value: "", disabled: true }],
      legalName: ["", [Validators.required, Validators.maxLength(150)]],
      taxId: [{ value: "", disabled: true }],
      registryNumber: [{ value: "", disabled: true }],

      responsibleFullName: [
        "",
        [Validators.required, Validators.maxLength(100)],
      ],
      responsibleRole: ["", [Validators.required, Validators.maxLength(60)]],

      contactPhone: [
        "",
        [Validators.required, Validators.pattern(/^[0-9+\-\s()]{7,20}$/)],
      ],
      contactEmail: [{ value: "", disabled: true }],
      address: this.fb.group({
        street: ["", [Validators.required, Validators.maxLength(120)]],
        number: ["", [Validators.required, Validators.maxLength(20)]],
        extra: [""],
        postalCode: ["", [Validators.required, Validators.pattern(/^\d{5}$/)]],
        city: ["", [Validators.required, Validators.maxLength(80)]],
        province: ["", [Validators.required, Validators.maxLength(80)]],
      }),

      facebook: [""],
      instagram: [""],
      website: [""],
    });

    this.passwordForm = this.fb.group(
      {
        currentPassword: ["", [Validators.required]],
        newPassword: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
            ),
          ],
        ],
        confirmNewPassword: ["", [Validators.required]],
      },
      { validators: [this.passwordsMatchValidator()] }
    );
  }

  /**
   * @description Get shelter profile data from API and populate the form
   */
  protected getShelterProfile(): void {
    this.isLoading = true;
    this.authService
      .getMyShelter(this.shelterId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (shelter) => {
          this.shelterForm.patchValue(shelter);
          console.log("shelter form", this.shelterForm.value);
        },
      });
  }

  /**
   * @description Submit form to register shelter
   * @returns
   */
  protected onSubmit(): void {
    if (this.shelterForm.invalid) {
      this.shelterForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const data: ShelterUpdateProfile = this.shelterForm.value;

    this.profileService
      .updateShelter(data)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          console.log("Actualización protectora", data);
          this.toastService.success(
            "Se han actualizado los datos",
            "Actualización completada"
          );
        },
      });
  }

  /**
   * @description Handle password change form submission
   */
  protected onChangePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isLoadingPassword = true;
    const currentPassword = this.passwordForm.get("currentPassword")?.value;
    const newPassword = this.passwordForm.get("newPassword")?.value;

    this.profileService
      .changePassword(this.shelterId, currentPassword, newPassword)
      .pipe(finalize(() => (this.isLoadingPassword = false)))
      .subscribe({
        next: () => {
          console.log("Cambio de contraseña", {
            currentPassword,
            newPassword,
          });
          this.toastService.success(
            "Se ha cambiado la contraseña",
            "Cambio de contraseña completado"
          );
          this.passwordForm.reset();
        },
      });
  }

  /**
   * @description Validator to check if password and confirm password match
   * @returns ValidationErrors | null
   */
  private passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get("newPassword")?.value;
      const confirm = group.get("confirmNewPassword")?.value;

      if (!password || !confirm) {
        return null;
      }

      return password === confirm ? null : { passwordsMismatch: true };
    };
  }
}
