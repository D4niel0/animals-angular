import { SelectOption } from "../../panel/components/shelter-animals-table/shelter-animals-table.component";

export const SPECIES_OPTIONS: SelectOption[] = [
  { label: "Perro", value: "dog", severity: "info" },
  { label: "Gato", value: "cat", severity: "success" },
  { label: "Otro", value: "other", severity: "warn" },
];

export const STATUS_OPTIONS: SelectOption[] = [
  { label: "Disponible", value: "available", severity: "success" },
  { label: "Reservado", value: "reserved", severity: "warn" },
];

export const SIZE_OPTIONS: SelectOption[] = [
  { label: "Pequeño", value: "small", severity: "info" },
  { label: "Mediano", value: "medium", severity: "warn" },
  { label: "Grande", value: "large", severity: "danger" },
];

export const SEX_OPTIONS: SelectOption[] = [
  { label: "Macho", value: "m", severity: "info" },
  { label: "Hembra", value: "f", severity: "success" },
];
