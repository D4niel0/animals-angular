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
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { AuthService } from "../../../services/auth.service";
import { finalize } from "rxjs";
import { AnimationOptions, LottieComponent } from "ngx-lottie";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    LottieComponent,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  protected loginForm: FormGroup;
  protected isLoading: boolean = false;
  protected options: AnimationOptions = {
    path: "/assets/lottie/cat-animation.json",
    autoplay: true,
    loop: true,
  };
  private authService = inject(AuthService);

  constructor(private fb: FormBuilder, private router: Router) {
    const rememberedEmail = localStorage.getItem("rememberedEmail") || "";
    this.loginForm = this.fb.group({
      email: [rememberedEmail, [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      remember: [false],
    });
  }

  /**
   * @description Submit form to login
   * @returns
   */
  protected onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    this.authService
      .login(email, password)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          if (this.loginForm.get("remember")?.value) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }
          localStorage.setItem("token", response.token);
          localStorage.setItem("shelterId", response.shelterId);
          this.authService["_isAuthenticated"].set(true);
          this.router.navigate(["/panel/shelter-animals"]);
        },
      });
  }

  get emailControl() {
    return this.loginForm.get("email");
  }

  get passwordControl() {
    return this.loginForm.get("password");
  }
}
