import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { delay, map, tap } from "rxjs";
import { Animal, ShelterUpdateProfile } from "../shared/models";
import { getAgeYears } from "../core/utils/date-utils";
import { environment } from "../../environments/environment.development";

@Injectable({ providedIn: "root" })
export class ProfileService {
  private apiUrl = environment.apiUrl;
  private _profileImage = signal<string | null>(null);
  readonly profileImage = this._profileImage.asReadonly();

  constructor(private http: HttpClient) {}

  /**
   * @description Set profile image URL in the signal
   */
  setProfileImage(imgUrl: string | null): void {
    this._profileImage.set(imgUrl);
  }

  /**
   * @description Clear profile image from signal
   */
  clearProfileImage(): void {
    this._profileImage.set(null);
  }

  updateShelter(shelterData: ShelterUpdateProfile) {
    const { id, ...filteredData } = shelterData;
    return this.http.patch(`${this.apiUrl}shelters/my-shelter`, filteredData);
  }

  getShelterAnimals() {
    return this.http.get<any>(`${this.apiUrl}animals/shelter-animals`).pipe(
      map((animals) =>
        animals.map((a: any) => ({
          ...a,
          ageYears: getAgeYears(a.birthdate),
        }))
      )
    );
  }

  createAnimal(animalData: FormData) {
    return this.http.post(`${this.apiUrl}animals`, animalData);
  }

  editAnimal(id: string, animalData: FormData) {
    return this.http.patch(`${this.apiUrl}animals/${id}`, animalData);
  }

  deleteAnimal(id: string) {
    return this.http.delete(`${this.apiUrl}animals/${id}`);
  }

  uploadProfileImage(formData: FormData) {
    return this.http
      .post<{ imgUrl: string }>(
        `${this.apiUrl}shelters/profile-image`,
        formData
      )
      .pipe(tap((response) => this._profileImage.set(response.imgUrl)));
  }
}
