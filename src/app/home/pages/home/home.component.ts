import { Component, inject } from "@angular/core";
import { BannerComponent } from "../../components/banner/banner.component";
import { RevealOnScrollDirective } from "../../../shared/directives/reveal-on-scroll.directive";
import { SpeciesButtonsComponent } from "../../components/species-buttons/species-buttons.component";
import { MatStepperModule } from "@angular/material/stepper";
import { UrgentAnimalsComponent } from "../../components/urgent-animals/urgent-animals.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    BannerComponent,
    SpeciesButtonsComponent,
    UrgentAnimalsComponent,
    FooterComponent,
    RevealOnScrollDirective,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
