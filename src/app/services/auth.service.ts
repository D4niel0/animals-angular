import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay } from "rxjs";
import {
  LoginResponse,
  MyShelterProfile,
  ShelterRegistration,
} from "../shared/models";

@Injectable({ providedIn: "root" })
export class AuthService {
  private baseUrl = "http://localhost:3001/";

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}login`, { email, password })
      .pipe(delay(500));
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
    return this.http.post(`${this.baseUrl}logout`, {});
  }

  getMyShelter(shelterId: string) {
    return this.http
      .get<MyShelterProfile>(`${this.baseUrl}my-shelter/${shelterId || ""}`)
      .pipe(delay(500));
  }
}
