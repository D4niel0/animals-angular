import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnimalsComponent } from "./animals-home/pages/animals/animals.component";
import { ShellComponent } from "./shared/components/shell/shell.component";
import { HomeComponent } from "./home/pages/home/home.component";
import { AnimalDetailComponent } from "./animals-home/components/animal-detail/animal-detail.component";

export const routes: Routes = [
  {
    path: "",
    component: ShellComponent,
    children: [
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "animals-home",
        component: AnimalsComponent,
      },
      {
        path: "animals-home/:id",
        component: AnimalDetailComponent,
      },
      {
        path: "**",
        redirectTo: "home",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
