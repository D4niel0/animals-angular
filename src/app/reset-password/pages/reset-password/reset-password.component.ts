import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { ButtonModule } from "primeng/button";

import { ControlPasswordComponent } from "../../../shared/components/control-password/control-password.component";
import { AuthService } from "../../../services/auth.service";
import { finalize } from "rxjs";

@Component({
  selector: "app-reset-password",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    ControlPasswordComponent,
  ],
  templateUrl: "./reset-password.component.html",
})
export class ResetPasswordComponent {
  private authService = inject(AuthService);

  protected resetForm: FormGroup;
  protected submitted = false;
  protected token: string | null = null;
  protected isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token =
      this.route.snapshot.queryParamMap.get("token") ||
      this.route.snapshot.paramMap.get("token");

    this.resetForm = this.fb.group(
      {
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
      },
      {
        validators: [this.passwordsMatchValidator()],
      }
    );
  }

  get passwordControl() {
    return this.resetForm.get("password");
  }

  get confirmPasswordControl() {
    return this.resetForm.get("confirmPassword");
  }

  /**
   * @description Submit form to reset password
   * @returns
   */
  protected onSubmit(): void {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const { password } = this.resetForm.value;

    this.authService
      .resetPassword(this.token, password)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          console.log("Reset password", { token: this.token, password });
          this.submitted = true;
          this.router.navigate(["/login"]);
        },
      });
  }

  /**
   * @description Validator to check if password and confirm password match
   * @returns
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
