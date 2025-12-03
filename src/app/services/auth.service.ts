import { HttpClient } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { delay } from "rxjs";
import { ForgotPasswordRequest, LoginResponse } from "../shared/models";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment.development";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = environment.apiUrl;

  private readonly _isAuthenticated = signal<boolean>(this.hasInitialToken());
  readonly isAuthenticated = computed(() => this._isAuthenticated());

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}auth/login`, {
      email,
      password,
    });
  }

  resetPassword(token: string | null, newPassword: string) {
    return this.http.post(`${this.apiUrl}auth/reset-password`, {
      token,
      newPassword,
    });
  }

  forgotPassword(info: ForgotPasswordRequest) {
    return this.http.post(`${this.apiUrl}auth/forgot-password`, info);
  }

  logout() {
    localStorage.removeItem("shelterId");
    localStorage.removeItem("token");
    this._isAuthenticated.set(false);
    this.router.navigate(["/home"]);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  changePassword(password: string, newPassword: string) {
    const body = {
      currentPassword: password,
      newPassword: newPassword,
    };
    return this.http.post(`${this.apiUrl}auth/change-password`, body);
  }

  private hasInitialToken(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
