import { ColorTagVariant } from "./components/color-tag/color-tag.component";

export interface Animal {
  id?: string;
  species: "dog" | "cat" | "other";
  name: string;
  ageYears?: number;
  birthdate?: string;

  size: "small" | "medium" | "large";
  status: "available" | "reserved" | "fostered";

  date?: string;
  sex: "m" | "f";
  breed?: string;
  compatibleWithDogs: "true" | "false" | "untested";
  compatibleWithCats: "true" | "false" | "untested";
  compatibleWithChildren: "true" | "false" | "untested";

  description: string;
  history: string;
  specialNeeds?: string;

  location?: AnimalLocation;

  imageUrl?: string[];
}

export interface AnimalLocation {
  city: string;
  province: string;
  shelter: AnimalShelter;
}

export interface AnimalShelter {
  id: string;
  imgUrl?: string;
  legalName: string;
  contactEmail: string;
  password: string;
  contactPhone?: string;
  facebook?: string;
  instagram?: string;
  addressCity?: string;
  addressProvince?: string;
  website?: string;
}

export interface ShelterRegistration {
  legalName: string;
  taxId: string;
  registryNumber: string;

  responsibleFullName: string;
  responsibleRole: string;

  contactPhone?: string;
  contactEmail: string;
  password: string;
  confirmPassword: string;
  addressCity?: string;
  addressProvince?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}

export interface MyShelterProfile extends ShelterRegistration {
  id: string;
  imgUrl?: string;
}

export interface LoginResponse {
  token: string;
  shelterId: string;
  imgUrl?: string;
}

export interface ShelterUpdateProfile {
  id: string;
  legalName: string;
  responsibleFullName: string;
  responsibleRole: string;

  contactPhone?: string;

  addressCity?: string;
  addressProvince?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}

export interface ShelterAnimals {
  id: string;
  name: string;
  status: "available" | "reserved" | "fostered";
  species: "dog" | "cat" | "other";
  imageUrl: string[];
  ageYears: number;
  size: "small" | "medium" | "large";
  sex: "m" | "f";
  birthdate: string;
}

export interface SelectOption {
  label: string;
  value: string;
  variant?: ColorTagVariant;
  severity?:
    | "info"
    | "success"
    | "secondary"
    | "warn"
    | "danger"
    | "contrast"
    | undefined;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
  location: string;

  homeSize: string;
  hadPets: string;
  familiarWithBreed: string;

  subject: string;
  message: string;
  animalId: string;
  animalName: string;
  shelterEmail: string;

  privacy?: boolean;
  recaptchaToken?: string;
}

export interface ForgotPasswordRequest {
  email: string;
  recaptchaToken: string;
}
