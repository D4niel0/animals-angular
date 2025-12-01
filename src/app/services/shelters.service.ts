import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay } from "rxjs";
import { AnimalShelter } from "../shared/models";

@Injectable({ providedIn: "root" })
export class SheltersService {
  private baseUrl = "http://localhost:3001/";
  private apiUrl = "http://localhost:3000/api/";

  constructor(private http: HttpClient) {}

  getShelters(): any {
    return this.http
      .get<AnimalShelter[]>(`${this.apiUrl}shelters`)
      .pipe(delay(500));
  }
}
