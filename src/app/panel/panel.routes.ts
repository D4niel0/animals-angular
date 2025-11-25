import { Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ShelterAnimalsComponent } from "./pages/shelter-animals/shelter-animals.component";

export const panelRoutes: Routes = [
  { path: "profile", component: ProfileComponent },
  { path: "shelter-animals", component: ShelterAnimalsComponent },
];
