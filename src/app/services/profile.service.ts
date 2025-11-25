import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay } from "rxjs";
import { ShelterUpdateProfile } from "../shared/models";

@Injectable({ providedIn: "root" })
export class ProfileService {
  private baseUrl = "http://localhost:3001/";
  constructor(private http: HttpClient) {}

  updateShelter(shelterData: ShelterUpdateProfile) {
    return this.http
      .put(`${this.baseUrl}update-shelter`, shelterData)
      .pipe(delay(500));
  }

  changePassword(
    shelterId: string,
    currentPassword: string,
    newPassword: string
  ) {
    return this.http
      .post(`${this.baseUrl}change-password`, {
        shelterId,
        currentPassword,
        newPassword,
      })
      .pipe(delay(500));
  }

  getShelterAnimals() {
    return this.http
      .get<any>(`${this.baseUrl}shelter-animals`)
      .pipe(delay(500));
  }
}
