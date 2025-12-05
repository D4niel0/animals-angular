import { HttpClient } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { environment } from "../../environments/environment.development";
import {
  ForgotPasswordRequest,
  LoginResponse,
  JwtPayload,
} from "../shared/models";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = environment.apiUrl;

  private readonly _isAuthenticated = signal<boolean>(this.hasInitialToken());
  private readonly _userRole = signal<string | null>(this.getInitialRole());
  private readonly _isAdmin = computed(() => this._userRole() === "ADMIN");

  readonly isAuthenticated = computed(() => this._isAuthenticated());
  readonly isAdmin = computed(() => this._isAdmin());
  readonly userRole = computed(() => this._userRole());

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}auth/login`, {
      email,
      password,
    });
  }

  setToken(token: string): void {
    localStorage.setItem("token", token);
    this._isAuthenticated.set(true);
    this.decodeAndSetRole(token);
  }

  private decodeAndSetRole(token: string): void {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      this._userRole.set(decoded.role || null);

      // Opcional: guardar shelterId si existe
      if (decoded.shelterId) {
        localStorage.setItem("shelterId", decoded.shelterId);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      this._userRole.set(null);
    }
  }

  private getInitialRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.role || null;
    } catch (error) {
      console.error("Error decoding initial token:", error);
      return null;
    }
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
    this._userRole.set(null);
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

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  }
}
