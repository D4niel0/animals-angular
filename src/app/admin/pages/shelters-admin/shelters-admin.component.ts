import { Component } from "@angular/core";
import { SheltersAdminTableComponent } from "../../components/shelters-admin-table/shelters-admin-table.component";

@Component({
  selector: "app-shelters-admin",
  standalone: true,
  imports: [SheltersAdminTableComponent],
  template: `
    <section>
      <article class="bg-white/70 shadow-md rounded-md p-5 mt-5">
        <header class="mb-6">
          <h1
            class="font-chewy text-xl md:text-2xl font-semibold text-gray-900"
          >
            Gestión de Protectoras
          </h1>
          <p class="text-sm text-gray-600 mt-1">
            Administra todas las protectoras registradas en la plataforma
          </p>
        </header>

        <app-shelters-admin-table></app-shelters-admin-table>
      </article>
    </section>
  `,
})
export class SheltersAdminComponent {}
