import { Routes } from "@angular/router";
import { AnimalsComponent } from "./animals-home/pages/animals/animals.component";
import { ShellComponent } from "./shared/components/shell/shell.component";
import { HomeComponent } from "./home/pages/home/home.component";
import { AnimalDetailComponent } from "./animals-home/components/animal-detail/animal-detail.component";
import { SheltersComponent } from "./shelters-home/pages/shelters/shelters.component";
import { RegisterComponent } from "./register/pages/register/register.component";
import { LoginComponent } from "./login/pages/login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/pages/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/pages/reset-password/reset-password.component";

export const routes: Routes = [
  {
    path: "",
    component: ShellComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "animals-home", component: AnimalsComponent },
      { path: "animals-home/:id", component: AnimalDetailComponent },
      { path: "shelters-home", component: SheltersComponent },
      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent },
      { path: "forgot-password", component: ForgotPasswordComponent },
      { path: "reset-password", component: ResetPasswordComponent },

      { path: "**", redirectTo: "home" },
    ],
  },
];
