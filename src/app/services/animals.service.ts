import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay } from "rxjs";

@Injectable({ providedIn: "root" })
export class AnimalsService {
  private baseUrl = "http://localhost:3001/animals";

  constructor(private http: HttpClient) {}

  getAnimals(): any {
    return this.http.get<any[]>(this.baseUrl).pipe(delay(500));
  }
}
