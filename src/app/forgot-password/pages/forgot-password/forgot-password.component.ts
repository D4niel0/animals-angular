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
import { environment } from "../../../../environments/environment.development";
import { NgxCaptchaModule } from "ngx-captcha";
import { ToastService } from "../../../services/toast.service";

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
    NgxCaptchaModule,
  ],
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.scss",
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  protected forgotForm: FormGroup;
  protected submitted: boolean = false;
  protected isLoading: boolean = false;
  protected options: AnimationOptions = {
    path: "/assets/lottie/cat-animation.json",
    autoplay: true,
    loop: true,
  };
  protected recaptchaSiteKey = environment.recaptchaSiteKey;

  constructor(private fb: FormBuilder, private router: Router) {
    const rememberedEmail = localStorage.getItem("rememberedEmail") || "";

    this.forgotForm = this.fb.group({
      email: [rememberedEmail, [Validators.required, Validators.email]],
      recaptcha: ["", Validators.required],
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

    const { email, recaptcha } = this.forgotForm.value;
    this.authService
      .forgotPassword({ email, recaptchaToken: recaptcha })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.submitted = true;
          this.toastService.success(
            "Si el correo introducido está registrado, recibirás un mensaje con las instrucciones para restablecer tu contraseña en los próximos minutos.",
            "Instrucciones enviadas"
          );
          this.router.navigate(["/home"]);
        },
      });
  }
}
