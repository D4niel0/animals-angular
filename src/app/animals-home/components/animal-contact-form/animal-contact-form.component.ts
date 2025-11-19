import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { SharedModuleModule } from "../../../shared/shared-module/shared-module.module";
import { FormBuilder, Validators } from "@angular/forms";
import { Animal } from "../../../shared/models";
import { SnackbarService } from "../../../services/snackbar.service";

@Component({
  selector: "app-animal-contact-form",
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: "./animal-contact-form.component.html",
  styleUrl: "./animal-contact-form.component.scss",
})
export class AnimalContactFormComponent {
  private fb = inject(FormBuilder);
  private snackBarService = inject(SnackbarService);

  @Input() animal: Animal | undefined;
  @Output() showContactForm = new EventEmitter<void>();

  contactForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phone: [""],
    location: [""],

    homeSize: ["", Validators.required],
    hadPets: ["", Validators.required],
    familiarWithBreed: ["", Validators.required],

    subject: ["info", Validators.required],
    message: ["", Validators.required],
    privacy: [false, Validators.requiredTrue],
  });

  /**
   * @description Submit contact form
   * @param animal Animal contact
   */
  protected submitContactForm(animal: any): void {
    if (this.contactForm.invalid) return;

    const data = {
      ...this.contactForm.value,
      animalId: animal.id,
      animalName: animal.name,
      shelterEmail: animal.location.shelter.email,
    };

    this.snackBarService.open(
      `¡Tu mensaje ha sido enviado a la protectora de ${animal.name}!`,
      "success"
    );

    this.contactForm.reset();
    this.showContactForm.emit();
  }
}
