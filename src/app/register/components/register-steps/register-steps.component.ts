import { Component } from "@angular/core";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "app-register-steps",
  standalone: true,
  imports: [TooltipModule],
  templateUrl: "./register-steps.component.html",
  styleUrl: "./register-steps.component.scss",
})
export class RegisterStepsComponent {}
