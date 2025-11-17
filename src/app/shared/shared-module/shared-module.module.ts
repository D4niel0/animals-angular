// ...existing code...
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";

const MATERIAL_MODULES = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatDividerModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ...MATERIAL_MODULES,
  ],
})
export class SharedModuleModule {}
