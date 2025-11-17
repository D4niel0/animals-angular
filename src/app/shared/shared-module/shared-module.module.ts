// ...existing code...
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

// const MATERIAL_MODULES = [
// ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // ...MATERIAL_MODULES,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // ...MATERIAL_MODULES,
  ],
})
export class SharedModuleModule {}
