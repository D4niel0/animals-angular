import { Component, inject, OnInit } from "@angular/core";
import { AnimalsService } from "../../../services/animals.service";
import { Animal } from "../../../shared/models";
import { SharedModuleModule } from "../../../shared/shared-module/shared-module.module";
import { CardsComponent } from "../../../shared/components/cards/cards.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-animals",
  standalone: true,
  imports: [SharedModuleModule, CardsComponent],
  templateUrl: "./animals.component.html",
  styleUrl: "./animals.component.scss",
})
export class AnimalsComponent implements OnInit {
  private animalsService = inject(AnimalsService);

  protected animalsList: Animal[] = [];

  ngOnInit(): void {
    this.getAnimals();
  }

  getAnimals() {
    return this.animalsService.getAnimals().subscribe((data: Animal[]) => {
      this.animalsList = data;
    });
  }
}
