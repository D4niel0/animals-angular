import { Component, inject, OnInit } from "@angular/core";
import { AnimalsService } from "../../../services/animals.service";
import { Animal } from "../../../shared/models";
import { SharedModuleModule } from "../../../shared/shared-module/shared-module.module";
import { CardsComponent } from "../../../shared/components/cards/cards.component";
import { CommonModule } from "@angular/common";
import { ScrollService, SavedScroll } from "../../../services/scroll.service";
import { finalize, Subscription } from "rxjs";
import { PawSpinnerComponent } from "../../../shared/components/paw-spinner/paw-spinner.component";

@Component({
  selector: "app-animals",
  standalone: true,
  imports: [SharedModuleModule, CardsComponent, PawSpinnerComponent],
  templateUrl: "./animals.component.html",
  styleUrl: "./animals.component.scss",
})
export class AnimalsComponent implements OnInit {
  private animalsService = inject(AnimalsService);
  private scrollService = inject(ScrollService);
  protected animalsList: Animal[] = [];
  protected isLoading: boolean = false;

  ngOnInit(): void {
    this.getAnimals();
  }

  /**
   * @description Fetch the list of animals and restore scroll position if available.
   * @returns
   */
  protected getAnimals(): Subscription {
    this.isLoading = true;
    return this.animalsService
      .getAnimals()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data: Animal[]) => {
        this.animalsList = data;
        const saved: SavedScroll | null = this.scrollService.get("animals");

        if (saved !== null) {
          setTimeout(() => {
            if (saved.selector) {
              const el = document.querySelector<HTMLElement>(saved.selector);
              if (el) {
                el.scrollTop = saved.y;
                this.scrollService.clear("animals");
                return;
              }
            }
            window.scrollTo({ top: saved.y, behavior: "auto" });
            this.scrollService.clear("animals");
          }, 100);
        }
      });
  }
}
