import { Component, inject } from "@angular/core";
import { CountUpDirective } from "../../../shared/directives/count-up.directive";
import { AnimalsService } from "../../../services/animals.service";
import { BannerComponent } from "../../components/banner/banner.component";
import { RevealOnScrollDirective } from "../../../shared/directives/reveal-on-scroll.directive";
import { SpeciesButtonsComponent } from "../../components/species-buttons/species-buttons.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [BannerComponent, SpeciesButtonsComponent, RevealOnScrollDirective],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
