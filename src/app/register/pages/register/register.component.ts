import { Component, computed, inject } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ShelterRegistration } from "../../../shared/models";
import { CommonModule } from "@angular/common";
import { ControlPasswordComponent } from "../../../shared/components/control-password/control-password.component";
import { TooltipModule } from "primeng/tooltip";
import { StepsModule } from "primeng/steps";
import { RegisterStepsComponent } from "../../components/register-steps/register-steps.component";
import { ToastService } from "../../../services/toast.service";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { SheltersService } from "../../../services/shelters.service";
import { AuthService } from "../../../services/auth.service";
import { PROVINCES } from "../../../core/constants/provinces.const";
import { SelectModule } from "primeng/select";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ControlPasswordComponent,
    TooltipModule,
    StepsModule,
    RegisterStepsComponent,
    SelectModule,
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  private toastService = inject(ToastService);
  private router = inject(Router);
  private sheltersService = inject(SheltersService);
  private authService = inject(AuthService);
  protected isLoading: boolean = false;
  protected shelterForm: FormGroup = new FormGroup({});

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
    this.initializeForm();
  }

  /**
   * @description Initialize the registration form with validation
   */
  protected initializeForm(): void {
    this.shelterForm = this.fb.group(
      {
        legalName: ["", [Validators.required, Validators.maxLength(150)]],
        taxId: ["", [Validators.required, Validators.maxLength(20)]],
        registryNumber: ["", [Validators.required, Validators.maxLength(50)]],

        responsibleFullName: [
          "",
          [Validators.required, Validators.maxLength(100)],
        ],
        responsibleRole: ["", [Validators.required, Validators.maxLength(60)]],

        contactPhone: [
          "",
          [Validators.required, Validators.pattern(/^[0-9+\-\s()]{7,20}$/)],
        ],
        contactEmail: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
            ),
          ],
        ],
        confirmPassword: ["", [Validators.required]],
        addressCity: ["", [Validators.required, Validators.maxLength(80)]],
        addressProvince: ["", [Validators.required, Validators.maxLength(80)]],
        facebook: [""],
        instagram: [""],
        website: [""],
      },
      {
        validators: [this.passwordsMatchValidator()],
      }
    );
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
    const data: ShelterRegistration = this.shelterForm.value;

    this.sheltersService
      .preRegisterShelter(data)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          console.log("Registro protectora", data);
          this.toastService.success(
            "Te has registrado correctamente. En un plazo de 24-48 horas recibirás un correo electrónico con la confirmación del alta",
            "Registro completado"
          );

          this.router.navigate(["/"]);
        },
      });
  }

  get passwordControl() {
    return this.shelterForm.get("password");
  }

  get confirmPasswordControl() {
    return this.shelterForm.get("confirmPassword");
  }

  /**
   * @description Validator to check if password and confirm password match
   * @returns ValidationErrors | null
   */
  private passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get("password")?.value;
      const confirm = group.get("confirmPassword")?.value;

      if (!password || !confirm) {
        return null;
      }

      return password === confirm ? null : { passwordsMismatch: true };
    };
  }
}
