export interface Animal {
  id: number;
  species: "dog";
  name: string;
  ageYears: number;

  size: "small" | "medium" | "large";

  date: string;
  sex: "m" | "f";
  breed: string;
  compatibleWithDogs: boolean;
  compatibleWithCats: boolean;
  compatibleWithChildren: boolean;

  description: string;
  history: string;
  specialNeeds?: string;

  location: AnimalLocation;

  imageUrl: string[];
}

export interface AnimalLocation {
  city: string;
  region: string;
  country: string;
  shelter: AnimalShelter;
}

export interface AnimalShelter {
  id: string;
  logo?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  facebook?: string;
  instagram?: string;
  address?: Address;
}

export interface Address {
  city: string;
  region: string;
}

export interface Address {
  street: string;
  number: string | number;
  extra?: string;
  postalCode: string;
  city: string;
  province: string;
}

export interface ShelterRegistration {
  legalName: string;
  taxId: string;
  registryNumber: string;

  responsibleFullName: string;
  responsibleRole: string;

  contactPhone: string;
  contactEmail: string;

  address: Address;

  facebook?: string;
  instagram?: string;
  website?: string;
}

export interface MyShelterProfileResponse {
  myShelter: MyShelterProfile;
  token: string;
}

export interface MyShelterProfile extends ShelterRegistration {
  id: string;
}
