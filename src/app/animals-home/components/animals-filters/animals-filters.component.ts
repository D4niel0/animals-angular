import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SharedModuleModule } from "../../../shared/shared-module/shared-module.module";
import { PROVINCES } from "../../../core/constants/provinces.const";
import { AnimalsFiltersStore } from "../../../core/stores/animal-filters.store";

@Component({
  selector: "app-animals-filters",
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: "./animals-filters.component.html",
  styleUrl: "./animals-filters.component.scss",
})
export class AnimalsFiltersComponent {
  private fb = inject(FormBuilder);
  private filtersStore = inject(AnimalsFiltersStore);

  protected filtersForm: FormGroup = new FormGroup({});

  speciesList = ["dog", "cat", "other"];
  sizeList = ["small", "medium", "large"];
  genderList = ["m", "f"];
  compatibilityList = ["dog", "cat", "child"];

  readonly AGE_MAX = 20;
  readonly PROVINCES_LIST = PROVINCES;

  get ageValueLabel(): string {
    const val = Number(this.filtersForm.get("ageRange")?.value ?? 0);
    return val >= this.AGE_MAX ? `+${this.AGE_MAX}` : `${val}`;
  }

  constructor() {
    this.initializeForm();
    const saved = this.filtersStore.getFilters();
    this.filtersForm.patchValue(saved);

    this.filtersForm.valueChanges.subscribe((val) => {
      this.filtersStore.setFilters(val);
    });
  }

  /**
   * @description Toggle the selection of a chip in a multi-select control.
   * @param controlName The name of the form control.
   * @param value The value to toggle.
   */
  toggleChip(controlName: string, value: string) {
    const ctrl = this.filtersForm.get(controlName);
    const current = Array.isArray(ctrl?.value) ? [...ctrl!.value] : [];

    if (current.includes(value)) {
      const updated = current.filter((v) => v !== value);
      ctrl?.setValue(updated);
    } else {
      ctrl?.setValue([...current, value]);
    }
  }

  /**
   * @description Check if a value is selected in a multi-select control.
   * @param controlName The name of the form control.
   * @param value The value to check.
   * @returns True if the value is selected, false otherwise.
   */
  isSelected(controlName: string, value: string): boolean {
    const ctrl = this.filtersForm.get(controlName);
    const val = ctrl?.value;
    return Array.isArray(val) ? val.includes(value) : false;
  }

  /**
   * @description Initialize the filters form with default values.
   */
  private initializeForm(): void {
    this.filtersForm = this.fb.group({
      species: [[]],
      ageRangeStart: [0],
      ageRangeEnd: [this.AGE_MAX],
      size: [[]],
      gender: [[]],
      compatibility: [[]],
      location: [],
    });
  }

  /**
   * @description Get the current filter values from the form.
   */
  getCurrentFilters() {
    return this.filtersForm.value;
  }

  /**
   * @description Reset all filters to their default values.
   */
  resetFilters() {
    this.filtersStore.resetFilters();
    this.filtersForm.patchValue({
      species: [],
      size: [],
      gender: [],
      compatibility: [],
      ageRangeStart: 0,
      ageRangeEnd: this.AGE_MAX,
      location: [],
    });
  }

  /**
   * @description Format the label for the age range slider.
   * @param value The age value to format.
   * @returns The formatted label string.
   */
  formatLabel(value: number): string {
    if (value === 20) {
      return `+${value}`;
    }

    return `${value}`;
  }
}
