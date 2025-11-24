import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { PasswordModule } from "primeng/password";

@Component({
  selector: "app-control-password",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordModule],
  templateUrl: "./control-password.component.html",
  styleUrl: "./control-password.component.scss",
})
export class ControlPasswordComponent {
  @Input() password: FormControl = new FormControl();
  @Input() confirmPassword: FormControl = new FormControl();
  @Input() responsive: boolean = true;
}
