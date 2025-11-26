import { Component, inject, Input } from "@angular/core";
import { SelectOption, ShelterAnimals } from "../../../shared/models";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { TagModule } from "primeng/tag";
import { TooltipModule } from "primeng/tooltip";
import {
  SPECIES_OPTIONS,
  STATUS_OPTIONS,
  SIZE_OPTIONS,
  SEX_OPTIONS,
} from "../../../core/constants/filter-options.const";
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
import { SkeletonModule } from "primeng/skeleton";
import { ColorTagComponent } from "../../../shared/components/color-tag/color-tag.component";
import { ConfirmationService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastService } from "../../../services/toast.service";

@Component({
  selector: "app-shelter-animals-table-mobile",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    TooltipModule,
    FormsModule,
    SkeletonModule,
    ColorTagComponent,
    ConfirmDialogModule,
  ],
  templateUrl: "./shelter-animals-table-mobile.component.html",
  styleUrl: "./shelter-animals-table-mobile.component.scss",
  providers: [ConfirmationService],
})
export class ShelterAnimalsTableMobileComponent {
  @Input() animals: ShelterAnimals[] = [];
  @Input() isLoading: boolean = false;
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private toastService = inject(ToastService);
  protected speciesOptions: SelectOption[] = SPECIES_OPTIONS;
  protected statusOptions: SelectOption[] = STATUS_OPTIONS;
  protected sizeOptions: SelectOption[] = SIZE_OPTIONS;
  protected sexOptions: SelectOption[] = SEX_OPTIONS;

  protected getSpeciesLabel = getSpeciesLabel;
  protected getStatusLabel = getStatusLabel;
  protected getSizeLabel = getSizeLabel;
  protected getSexLabel = getSexLabel;

  protected getSpeciesSeverity = getSpeciesSeverity;
  protected getStatusSeverity = getStatusSeverity;
  protected getSizeSeverity = getSizeSeverity;
  protected getSexSeverity = getSexSeverity;

  protected nameFilter = "";
  protected speciesFilter: string | null = null;
  protected statusFilter: string | null = null;
  protected ageFilter: number | null = null;
  protected sizeFilter: string | null = null;
  protected sexFilter: string | null = null;
  protected showFilters = false;

  get filteredAnimalsMobile(): ShelterAnimals[] {
    return this.animals.filter((a) => {
      const matchesName =
        !this.nameFilter ||
        a.name.toLowerCase().includes(this.nameFilter.toLowerCase());

      const matchesSpecies =
        !this.speciesFilter || a.species === this.speciesFilter;

      const matchesStatus =
        !this.statusFilter || a.status === this.statusFilter;

      const matchesAge =
        this.ageFilter == null || a.ageYears === this.ageFilter;

      const matchesSize = !this.sizeFilter || a.size === this.sizeFilter;

      const matchesSex = !this.sexFilter || a.sex === this.sexFilter;

      return (
        matchesName &&
        matchesSpecies &&
        matchesStatus &&
        matchesAge &&
        matchesSize &&
        matchesSex
      );
    });
  }

  /**
   * @description Edit animal action
   * @param animal ShelterAnimals
   */
  protected onEdit(animalId: string): void {
    this.router.navigate([`/panel/shelter-animals/${animalId}/edit`]);
  }

  /**
   * @description Clear all mobile filters
   */
  protected clearMobileFilters(): void {
    this.nameFilter = "";
    this.speciesFilter = null;
    this.statusFilter = null;
    this.ageFilter = null;
    this.sizeFilter = null;
    this.sexFilter = null;
  }

  /**
   * @description Toggle the visibility of the filters section.
   */
  protected toggleShowFilters(): void {
    this.showFilters = !this.showFilters;
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
