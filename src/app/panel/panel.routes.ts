import { Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ShelterAnimalsComponent } from "./pages/shelter-animals/shelter-animals.component";
import { ShelterAnimalFormPageComponent } from "./pages/shelter-animal-form-page/shelter-animal-form-page.component";

export const panelRoutes: Routes = [
  { path: "profile", component: ProfileComponent },
  { path: "shelter-animals", component: ShelterAnimalsComponent },
  {
    path: "shelter-animals/new",
    component: ShelterAnimalFormPageComponent,
  },
  {
    path: "shelter-animals/:id/edit",
    component: ShelterAnimalFormPageComponent,
  },
];
