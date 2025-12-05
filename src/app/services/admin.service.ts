import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { AnimalShelter } from "../shared/models";

@Injectable({ providedIn: "root" })
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllShelters(): any {
    return this.http.get<AnimalShelter[]>(`${this.apiUrl}admin/shelters`);
  }

  getShelterById(shelterId: string) {
    return this.http.get<AnimalShelter>(
      `${this.apiUrl}admin/shelters/${shelterId}`
    );
  }

  /**
   * @description Actualizar protectora (admin)
   */
  updateShelter(shelterId: string, data: Partial<AnimalShelter>) {
    return this.http.put(`${this.apiUrl}admin/shelters/${shelterId}`, data);
  }

  /**
   * @description Eliminar protectora (admin)
   */
  deleteShelter(shelterId: string) {
    return this.http.delete(`${this.apiUrl}admin/shelters/${shelterId}`);
  }
}
