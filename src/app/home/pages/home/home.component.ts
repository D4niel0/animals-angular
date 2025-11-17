import { Component, inject } from "@angular/core";
import { CountUpDirective } from "../../../shared/directives/count-up.directive";
import { AnimalsService } from "../../../services/animals.service";
import { BannerComponent } from "../../components/banner/banner.component";
import { RevealOnScrollDirective } from "../../../shared/directives/reveal-on-scroll.directive";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [BannerComponent, RevealOnScrollDirective],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
