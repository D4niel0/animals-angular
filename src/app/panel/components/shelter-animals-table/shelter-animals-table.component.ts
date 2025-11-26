import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
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
  ],
  templateUrl: "./shelter-animals-table.component.html",
  styleUrl: "./shelter-animals-table.component.scss",
})
export class ShelterAnimalsTableComponent {
  @Input() animals: ShelterAnimals[] = [];
  @Input() isLoading: boolean = false;

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
  onEdit(animal: ShelterAnimals): void {
    console.log("Edit animal:", animal);
  }
}
