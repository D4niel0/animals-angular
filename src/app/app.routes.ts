import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnimalsComponent } from "./animals-home/pages/animals/animals.component";
import { ShellComponent } from "./shared/components/shell/shell.component";

export const routes: Routes = [
  {
    path: "",
    component: ShellComponent,
    children: [
      {
        path: "animals-home",
        component: AnimalsComponent,
      },
      {
        path: "**",
        redirectTo: "animals-home",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
