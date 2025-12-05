import { Routes } from "@angular/router";
import { SheltersAdminComponent } from "../admin/pages/shelters-admin/shelters-admin.component";
import { EditShelterComponent } from "./pages/edit-shelter/edit-shelter.component";

export const adminRoutes: Routes = [
  {
    path: "shelter-admin",
    component: SheltersAdminComponent,
  },
  {
    path: "shelter-admin/:id/edit",
    component: EditShelterComponent,
  },
];
