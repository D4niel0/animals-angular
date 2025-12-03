import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { Animal, Contact } from "../../../shared/models";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { TextareaModule } from "primeng/textarea";
import { CheckboxModule } from "primeng/checkbox";
import { ToastModule } from "primeng/toast";
import { ToastService } from "../../../services/toast.service";
import { SheltersService } from "../../../services/shelters.service";
import { finalize } from "rxjs";
import { NgxCaptchaModule } from "ngx-captcha";
import { environment } from "../../../../environments/environment.development";

@Component({
  selector: "app-animal-contact-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    TextareaModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    NgxCaptchaModule,
  ],
  templateUrl: "./animal-contact-form.component.html",
  styleUrl: "./animal-contact-form.component.scss",
})
export class AnimalContactFormComponent {
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  private sheltersService = inject(SheltersService);
  protected homeSizeOptions = [
    { label: "Pequeño (estudio / 1 habitación)", value: "small" },
    { label: "Mediano (piso estándar)", value: "medium" },
    { label: "Grande (casa o jardín)", value: "large" },
  ];
  protected yesNoOptions = [
    { label: "Sí", value: "yes" },
    { label: "No", value: "no" },
  ];

  protected get subjectOptions() {
    return [
      {
        label: `Quiero información sobre ${this.animal?.name ?? ""}`,
        value: "info",
      },
      { label: "Quiero iniciar proceso de adopción", value: "adoption" },
      { label: "Quiero ser casa de acogida", value: "foster" },
      { label: "Otras consultas", value: "other" },
    ];
  }
  protected isLoading = false;
  protected recaptchaSiteKey = environment.recaptchaSiteKey;

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
    message: ["", [Validators.required, Validators.minLength(10)]],
    privacy: [false, Validators.requiredTrue],
    recaptchaToken: ["", Validators.required],
  });

  /**
   * @description Submit contact form
   * @param animal Animal contact
   */
  protected submitContactForm(animal: any): void {
    this.isLoading = true;
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    const data: Contact = {
      ...this.contactForm.value,
      animalId: animal.id,
      animalName: animal.name,
    } as Contact;

    delete data.privacy;

    this.sheltersService
      .contactForm(data)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.toastService.success(
            `¡Tu mensaje ha sido enviado a los responsables de ${animal.name}!`
          );
          window.scrollTo({ top: 0, behavior: "smooth" });

          this.contactForm.reset();
          this.showContactForm.emit();
        },
      });
  }
}
