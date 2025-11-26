import { SelectOption } from "../../shared/models";

export const SPECIES_OPTIONS: SelectOption[] = [
  { label: "Perro", value: "dog", variant: "lime" },
  { label: "Gato", value: "cat", variant: "purple" },
  { label: "Otro", value: "other", variant: "zinc" },
];

export const STATUS_OPTIONS: SelectOption[] = [
  { label: "Disponible", value: "available", variant: "emerald" },
  { label: "Reservado", value: "reserved", variant: "yellow" },
];

export const SIZE_OPTIONS: SelectOption[] = [
  { label: "Pequeño", value: "small", variant: "sky" },
  { label: "Mediano", value: "medium", variant: "orange" },
  { label: "Grande", value: "large", variant: "slate" },
];

export const SEX_OPTIONS: SelectOption[] = [
  { label: "Macho", value: "m", variant: "blue" },
  { label: "Hembra", value: "f", variant: "pink" },
];
