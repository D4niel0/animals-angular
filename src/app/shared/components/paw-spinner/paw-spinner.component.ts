import { Component } from "@angular/core";
import { LottieComponent, AnimationOptions } from "ngx-lottie";

@Component({
  selector: "app-paw-spinner",
  standalone: true,
  imports: [LottieComponent],
  templateUrl: "./paw-spinner.component.html",
  styleUrl: "./paw-spinner.component.scss",
})
export class PawSpinnerComponent {
  options: AnimationOptions = {
    path: "/assets/lottie/dog-animation.json",
    autoplay: true,
    loop: true,
  };
}
