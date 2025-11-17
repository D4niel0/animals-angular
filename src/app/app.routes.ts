import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnimalsComponent } from "./animals-home/pages/animals/animals.component";
import { ShellComponent } from "./shared/components/shell/shell.component";
import { HomeComponent } from "./home/pages/home/home.component";

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
