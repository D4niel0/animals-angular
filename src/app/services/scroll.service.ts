import { Injectable } from "@angular/core";

export interface SavedScroll {
  y: number;
  selector?: string;
}

@Injectable({ providedIn: "root" })
export class ScrollService {
  private positions = new Map<string, SavedScroll>();

  set(route: string, data: SavedScroll) {
    this.positions.set(route, data);
  }

  get(route: string): SavedScroll | null {
    return this.positions.has(route)
      ? (this.positions.get(route) as SavedScroll)
      : null;
  }

  clear(route: string) {
    this.positions.delete(route);
  }
}
