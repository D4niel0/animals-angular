export interface Animal {
  id: number;
  species: "dog";
  name: string;
  ageYears: number;

  compatibleWithDogs: boolean;
  compatibleWithCats: boolean;
  compatibleWithChildren: boolean;

  description: string;

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
