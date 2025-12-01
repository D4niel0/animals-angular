import { HttpClient } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { delay } from "rxjs";
import {
  LoginResponse,
  MyShelterProfile,
  ShelterRegistration,
} from "../shared/models";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  private baseUrl = "http://localhost:3001/";

  private apiUrl = "http://localhost:3000/api/";

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
    return this.http
      .post(`${this.baseUrl}reset-password`, { token, newPassword })
      .pipe(delay(500));
  }

  forgotPassword(email: string) {
    return this.http
      .post(`${this.baseUrl}forgot-password`, { email })
      .pipe(delay(500));
  }

  registerShelter(shelterData: ShelterRegistration) {
    return this.http
      .post(`${this.baseUrl}register`, shelterData)
      .pipe(delay(500));
  }

  logout() {
    localStorage.removeItem("shelterId");
    localStorage.removeItem("token");
    this._isAuthenticated.set(false);
    this.router.navigate(["/home"]);
  }

  getMyShelter(shelterId: string) {
    return this.http
      .get<MyShelterProfile>(`${this.baseUrl}my-shelter/${shelterId || ""}`)
      .pipe(delay(500));
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  private hasInitialToken(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
