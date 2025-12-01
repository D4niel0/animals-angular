import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { delay, map, of, tap } from "rxjs";
import { Observable } from "rxjs";
import { Animal } from "../shared/models";
import { getAgeYears } from "../core/utils/date-utils";

@Injectable({ providedIn: "root" })
export class AnimalsService {
  private baseUrl = "http://localhost:3001/";
  private apiUrl = "http://localhost:3000/api/";

  private animalsSignal = signal<Animal[] | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * @description Fetch the list of animals from the API or return cached data.
   * @returns
   */
  getAnimals(): Observable<Animal[]> {
    const cached = this.animalsSignal();
    if (cached && cached.length > 0) {
      return of(cached);
    }

    return this.http.get<Animal[]>(`${this.apiUrl}animals`).pipe(
      delay(500),
      map((animals) =>
        animals.map((a) => ({
          ...a,
          ageYears: getAgeYears(a.birthdate),
        }))
      ),
      tap((animals) => this.animalsSignal.set(animals))
    );
  }

  /**
   * @description Force refresh the list of animals from the API.
   * @returns
   */
  refreshAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}animals`).pipe(
      delay(500),
      tap((animals) => this.animalsSignal.set(animals))
    );
  }

  /**
   * @description Get a single animal by its ID, checking the cache first.
   * @param id
   * @returns
   */
  getAnimalById(id: string): Observable<Animal | null> {
    return this.http.get<Animal>(`${this.apiUrl}animals/${id}`).pipe(
      delay(500),
      map((animal) => ({
        ...animal,
        ageYears: getAgeYears(animal.birthdate),
      }))
    );
  }

  /**
   * @description Get the count of animals from the API.
   * @returns
   */
  getCountAnimals(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}animals-count`).pipe(delay(500));
  }

  /**
   * @description Get the list of urgent animals from the API.
   * @returns
   */
  getUrgentAnimals(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}urgent-animals`)
      .pipe(delay(500));
  }

  /**
   * @description Clear the cached animals data.
   */
  clearAnimalsCache(): void {
    this.animalsSignal.set(null);
  }
}
