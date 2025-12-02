import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay } from "rxjs";
import {
  AnimalShelter,
  Contact,
  MyShelterProfile,
  ShelterRegistration,
} from "../shared/models";

@Injectable({ providedIn: "root" })
export class SheltersService {
  private apiUrl = "http://localhost:3000/api/";

  constructor(private http: HttpClient) {}

  getShelters(): any {
    return this.http.get<AnimalShelter[]>(`${this.apiUrl}shelters`);
  }

  preRegisterShelter(shelterData: ShelterRegistration) {
    const body = { ...shelterData };
    (["facebook", "instagram", "website"] as const).forEach((key) => {
      const val = (body as Record<string, unknown>)[key];
      if (val == null || (typeof val === "string" && val.trim() === "")) {
        delete (body as Record<string, unknown>)[key];
      }
    });
    shelterData = body;
    return this.http.post(`${this.apiUrl}shelters/pre-register`, shelterData);
  }

  getMyShelter() {
    return this.http.get<MyShelterProfile>(`${this.apiUrl}shelters/my-shelter`);
  }

  contactForm(contact: Contact) {
    return this.http.post(`${this.apiUrl}shelters/contact`, contact);
  }
}
