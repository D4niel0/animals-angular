import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";

import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { AuthService } from "../../../services/auth.service";
import { finalize } from "rxjs";

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: "./forgot-password.component.html",
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  protected forgotForm: FormGroup;
  protected submitted: boolean = false;
  protected isLoading: boolean = false;
  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  get emailControl() {
    return this.forgotForm.get("email");
  }

  /**
   * @description Submit form to request password reset
   * @returns
   */
  protected onSubmit(): void {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const { email } = this.forgotForm.value;
    this.authService
      .forgotPassword(email)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          console.log("Recuperar contraseña para:", email);
          this.submitted = true;
        },
      });
  }
}
