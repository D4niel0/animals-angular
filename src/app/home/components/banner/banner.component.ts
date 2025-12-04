import { Component, inject } from "@angular/core";
import { CountUpDirective } from "../../../shared/directives/count-up.directive";
import { AnimalsService } from "../../../services/animals.service";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-banner",
  standalone: true,
  imports: [CountUpDirective, RouterModule],
  templateUrl: "./banner.component.html",
  styleUrl: "./banner.component.scss",
})
export class BannerComponent {
  private animalsService = inject(AnimalsService);

  protected totalAnimals = 0;

  constructor() {
    this.animalsService.getCountAnimals().subscribe((total: number) => {
      this.totalAnimals = total;
    });
  }
}
