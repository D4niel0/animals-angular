import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay } from "rxjs";
import { Animal, ShelterUpdateProfile } from "../shared/models";

@Injectable({ providedIn: "root" })
export class ProfileService {
  private baseUrl = "http://localhost:3001/";
  private apiUrl = "http://localhost:3000/api/";

  constructor(private http: HttpClient) {}

  updateShelter(shelterData: ShelterUpdateProfile) {
    const { id, ...filteredData } = shelterData;
    return this.http.patch(`${this.apiUrl}shelters/my-shelter`, filteredData);
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

  createAnimal(animalData: FormData) {
    return this.http
      .post(`${this.baseUrl}new-animal`, animalData)
      .pipe(delay(500));
  }

  editAnimal(id: string, animalData: FormData) {
    return this.http
      .put(`${this.baseUrl}edit-animal/${id}`, animalData)
      .pipe(delay(500));
  }

  deleteAnimal(id: string) {
    return this.http
      .delete(`${this.baseUrl}delete-animal/${id}`)
      .pipe(delay(500));
  }
}
