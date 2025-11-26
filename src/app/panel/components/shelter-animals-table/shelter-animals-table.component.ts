import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { InputNumberModule } from "primeng/inputnumber";
import { SelectOption, ShelterAnimals } from "../../../shared/models";
import { TooltipModule } from "primeng/tooltip";
import { TagModule } from "primeng/tag";
import { FormsModule } from "@angular/forms";
import { ShelterAnimalsTableMobileComponent } from "../shelter-animals-table-mobile/shelter-animals-table-mobile.component";
import {
  getSpeciesLabel,
  getStatusLabel,
  getSizeLabel,
  getSexLabel,
  getSpeciesSeverity,
  getStatusSeverity,
  getSizeSeverity,
  getSexSeverity,
} from "../../../core/utils/label-severity-show";
import {
  SEX_OPTIONS,
  SIZE_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS,
} from "../../../core/constants/filter-options.const";
import { SkeletonModule } from "primeng/skeleton";
import {
  ColorTagComponent,
  ColorTagVariant,
} from "../../../shared/components/color-tag/color-tag.component";
import { ProfileService } from "../../../services/profile.service";
import { ConfirmationService } from "primeng/api";
import { ToastService } from "../../../services/toast.service";
import { ConfirmDialogModule } from "primeng/confirmdialog";

@Component({
  selector: "app-shelter-animals-table",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    TooltipModule,
    FormsModule,
    ShelterAnimalsTableMobileComponent,
    SkeletonModule,
    ColorTagComponent,
    ConfirmDialogModule,
  ],
  templateUrl: "./shelter-animals-table.component.html",
  styleUrl: "./shelter-animals-table.component.scss",
  providers: [ConfirmationService],
})
export class ShelterAnimalsTableComponent {
  @Input() animals: ShelterAnimals[] = [];
  @Input() isLoading: boolean = false;
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private toastService = inject(ToastService);

  speciesOptions: SelectOption[] = SPECIES_OPTIONS;
  statusOptions: SelectOption[] = STATUS_OPTIONS;
  sizeOptions: SelectOption[] = SIZE_OPTIONS;
  sexOptions: SelectOption[] = SEX_OPTIONS;

  protected getSpeciesLabel = getSpeciesLabel;
  protected getStatusLabel = getStatusLabel;
  protected getSizeLabel = getSizeLabel;
  protected getSexLabel = getSexLabel;

  protected getSpeciesSeverity = getSpeciesSeverity;
  protected getStatusSeverity = getStatusSeverity;
  protected getSizeSeverity = getSizeSeverity;
  protected getSexSeverity = getSexSeverity;

  /**
   * @description Edit animal action
   * @param animal ShelterAnimals
   */
  protected onEdit(animalId: string): void {
    this.router.navigate([`/panel/shelter-animals/${animalId}/edit`]);
  }

  protected deleteConfirm(
    event: MouseEvent,
    animalId: string,
    animalName: string
  ): void {
    this.confirmationService.confirm({
      target: event.currentTarget as HTMLElement,
      message: `¿Seguro que quieres eliminar a ${animalName}?`,
      icon: "pi pi-info-circle",
      header: "Eliminar animal",
      rejectButtonProps: {
        label: "Cancelar",
        severity: "secondary",
        outlined: true,
      },
      acceptButtonProps: {
        label: "Eliminar",
        severity: "danger",
      },
      accept: () => {
        // TODO: INTEGRACIÓN
        // this.profileService.deleteAnimal(animalId).subscribe(() => {
        //     this.animals = this.animals.filter(animal => animal.id !== animalId);
        //     this.toastService.success('Animal eliminado correctamente');
        // });
        this.toastService.info("Animal eliminado");
      },
    });
  }
}
