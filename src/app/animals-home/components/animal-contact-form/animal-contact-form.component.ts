import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { SharedModuleModule } from "../../../shared/shared-module/shared-module.module";
import { FormBuilder, Validators } from "@angular/forms";
import { Animal } from "../../../shared/models";

@Component({
  selector: "app-animal-contact-form",
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: "./animal-contact-form.component.html",
  styleUrl: "./animal-contact-form.component.scss",
})
export class AnimalContactFormComponent {
  private fb = inject(FormBuilder);

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

  submitContactForm(animal: any) {
    if (this.contactForm.invalid) return;

    const data = {
      ...this.contactForm.value,
      animalId: animal.id,
      animalName: animal.name,
      shelterEmail: animal.location.shelter.email,
    };

    console.log("Formulario enviado:", data);

    alert(`¡Tu mensaje ha sido enviado a la protectora de ${animal.name}!`);

    this.contactForm.reset();
    this.showContactForm.emit();
  }
}
