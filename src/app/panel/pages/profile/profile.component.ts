import { Component, computed, inject } from "@angular/core";
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
import { SheltersService } from "../../../services/shelters.service";
import { AuthService } from "../../../services/auth.service";
import { PROVINCES } from "../../../core/constants/provinces.const";
import { SelectModule } from "primeng/select";

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
    SelectModule,
  ],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent {
  private toastService = inject(ToastService);
  private sheltersService = inject(SheltersService);
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  protected isLoading: boolean = false;
  protected isLoadingPassword: boolean = false;
  protected isLoadingEdit: boolean = false;
  protected shelterForm: FormGroup = new FormGroup({});
  protected passwordForm: FormGroup = new FormGroup({});
  protected shelterId: string = localStorage.getItem("shelterId") || "";

  readonly isAuthenticated = this.authService.isAuthenticated;
  protected buttonTitle = computed<string>(() =>
    this.isAuthenticated() ? "Modificar" : "Enviar solicitud"
  );
  readonly PROVINCES_LIST = PROVINCES;
  protected provincesOptions = this.PROVINCES_LIST.map((p) => ({
    label: p,
    value: p,
  }));

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
      addressCity: ["", [Validators.required, Validators.maxLength(80)]],
      addressProvince: ["", [Validators.required, Validators.maxLength(80)]],

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
    this.sheltersService
      .getMyShelter()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (shelter) => {
          this.shelterForm.patchValue(shelter);
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

    this.isLoadingEdit = true;
    const data: ShelterUpdateProfile = this.shelterForm.value;

    this.profileService
      .updateShelter(data)
      .pipe(finalize(() => (this.isLoadingEdit = false)))
      .subscribe({
        next: () => {
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
