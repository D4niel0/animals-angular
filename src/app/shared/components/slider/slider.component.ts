import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";
import { ImageFallbackDirective } from "../../../core/directives/image-fallback.directive";

@Component({
  selector: "app-slider",
  standalone: true,
  imports: [CommonModule, ImageFallbackDirective],
  templateUrl: "./slider.component.html",
  styleUrl: "./slider.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderComponent {
  @Input() images: string[] | undefined;
}
