import { Component, inject } from "@angular/core";
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
import { MenuItem } from "primeng/api";
import { RegisterStepsComponent } from "../../components/register-steps/register-steps.component";
import { ToastService } from "../../../services/toast.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { finalize } from "rxjs";

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
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  private toastService = inject(ToastService);
  private router = inject(Router);
  private authService = inject(AuthService);
  protected isLoading: boolean = false;
  protected shelterForm: FormGroup = new FormGroup({});

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
        address: this.fb.group({
          city: ["", [Validators.required, Validators.maxLength(80)]],
          province: ["", [Validators.required, Validators.maxLength(80)]],
        }),

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

    this.authService
      .registerShelter(data)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          console.log("Registro protectora", data);
          this.toastService.success(
            "La protectora se ha registrado correctamente. En un plazo de 24-48 horas recibirás un correo electrónico con la confirmación del alta",
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
