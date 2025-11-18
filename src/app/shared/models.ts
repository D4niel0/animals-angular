export interface Animal {
  id: number;
  species: "dog";
  name: string;
  ageYears: number;

  size: "small" | "medium" | "large";

  date: string;
  compatibleWithDogs: boolean;
  compatibleWithCats: boolean;
  compatibleWithChildren: boolean;

  description: string;
  history: string;
  specialNeeds?: string;

  location: AnimalLocation;

  imageUrl: string;
}

export interface AnimalLocation {
  city: string;
  region: string;
  country: string;
  shelter: AnimalShelter;
}

export interface AnimalShelter {
  name: string;
  email: string;
  phone: string;
}
