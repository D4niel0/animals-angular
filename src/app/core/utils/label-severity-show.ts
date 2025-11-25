import { SelectOption } from "../../panel/components/shelter-animals-table/shelter-animals-table.component";
import { ShelterAnimals } from "../../shared/models";
import {
  SEX_OPTIONS,
  SIZE_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS,
} from "../constants/filter-options.const";

export function getSpeciesLabel(animal: ShelterAnimals): string {
  const map: Record<ShelterAnimals["species"], string> = {
    dog: "Perro",
    cat: "Gato",
    other: "Otro",
  };
  return map[animal.species];
}

export function getStatusLabel(animal: ShelterAnimals): string {
  const map: Record<ShelterAnimals["status"], string> = {
    available: "Disponible",
    reserved: "Reservado",
  };
  return map[animal.status];
}

export function getSizeLabel(animal: ShelterAnimals): string {
  const map: Record<ShelterAnimals["size"], string> = {
    small: "Pequeño",
    medium: "Mediano",
    large: "Grande",
  };
  return map[animal.size];
}

export function getSexLabel(animal: ShelterAnimals): string {
  const map: Record<ShelterAnimals["sex"], string> = {
    m: "Macho",
    f: "Hembra",
  };
  return map[animal.sex];
}

export function getSpeciesSeverity(species: ShelterAnimals["species"]) {
  return SPECIES_OPTIONS.find((o) => o.value === species)?.severity ?? "info";
}

export function getStatusSeverity(status: ShelterAnimals["status"]) {
  return STATUS_OPTIONS.find((o) => o.value === status)?.severity ?? "info";
}

export function getSizeSeverity(size: ShelterAnimals["size"]) {
  return SIZE_OPTIONS.find((o) => o.value === size)?.severity ?? "info";
}

export function getSexSeverity(sex: ShelterAnimals["sex"]) {
  return SEX_OPTIONS.find((o) => o.value === sex)?.severity ?? "info";
}
