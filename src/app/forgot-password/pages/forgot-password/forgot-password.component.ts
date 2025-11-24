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
import { AnimationOptions, LottieComponent } from "ngx-lottie";

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    LottieComponent,
  ],
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.scss",
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  protected forgotForm: FormGroup;
  protected submitted: boolean = false;
  protected isLoading: boolean = false;
  protected options: AnimationOptions = {
    path: "/assets/lottie/cat-animation.json",
    autoplay: true,
    loop: true,
  };

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
