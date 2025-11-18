import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";

@Component({
  selector: "app-slider",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./slider.component.html",
  styleUrl: "./slider.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderComponent {
  @Input() images: string[] = [];
}
