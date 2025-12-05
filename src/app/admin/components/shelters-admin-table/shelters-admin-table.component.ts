import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import { FormsModule } from "@angular/forms";
import { AnimalShelter, SelectOption } from "../../../shared/models";
import { SkeletonModule } from "primeng/skeleton";
import { ColorTagComponent } from "../../../shared/components/color-tag/color-tag.component";
import { ConfirmationService } from "primeng/api";
import { ToastService } from "../../../services/toast.service";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { SheltersService } from "../../../services/shelters.service";
import { finalize } from "rxjs";
import { AdminService } from "../../../services/admin.service";

@Component({
  selector: "app-shelters-admin-table",
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    TooltipModule,
    FormsModule,
    SkeletonModule,
    ColorTagComponent,
    ConfirmDialogModule,
  ],
  templateUrl: "./shelters-admin-table.component.html",
  styleUrl: "./shelters-admin-table.component.scss",
  providers: [ConfirmationService],
})
export class SheltersAdminTableComponent implements OnInit {
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private toastService = inject(ToastService);
  private sheltersService = inject(SheltersService);
  private adminService = inject(AdminService);
  protected shelters: AnimalShelter[] = [];
  protected isLoading = false;

  approvedOptions: SelectOption[] = [
    { label: "Aprobada", value: "true", variant: "green" },
    { label: "Pendiente", value: "false", variant: "yellow" },
  ];

  ngOnInit(): void {
    this.loadShelters();
  }

  /**
   * @description Cargar todas las protectoras
   */
  private loadShelters(): void {
    this.isLoading = true;
    this.adminService
      .getAllShelters()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (shelters: AnimalShelter[]) => {
          this.shelters = shelters;
        },
        error: () => {
          this.toastService.error("Error al cargar las protectoras");
        },
      });
  }

  /**
   * @description Obtener label de aprobación
   */
  protected getApprovedLabel(shelter: AnimalShelter): string {
    return shelter.isApproved ? "Aprobada" : "Pendiente";
  }

  /**
   * @description Obtener variant de aprobación
   */
  protected getApprovedVariant(
    isApproved: boolean | undefined
  ): "green" | "yellow" {
    return isApproved ? "green" : "yellow";
  }

  /**
   * @description Editar protectora
   */
  protected onEdit(shelterId: string): void {
    this.router.navigate([`admin/shelter-admin/${shelterId}/edit`]);
  }

  /**
   * @description Confirmar eliminación de protectora
   */
  protected deleteConfirm(
    event: MouseEvent,
    shelterId: string,
    shelterName: string
  ): void {
    this.confirmationService.confirm({
      target: event.currentTarget as HTMLElement,
      message: `¿Seguro que quieres eliminar la protectora "${shelterName}"?`,
      icon: "pi pi-info-circle",
      header: "Eliminar protectora",
      rejectButtonProps: {
        label: "Cancelar",
        severity: "secondary",
        outlined: true,
      },
      acceptButtonProps: {
        label: "Eliminar",
        severity: "danger",
      },
      accept: () => {
        this.adminService.deleteShelter(shelterId).subscribe({
          next: () => {
            this.toastService.info("Protectora eliminada");
            this.shelters = this.shelters.filter((s) => s.id !== shelterId);
          },
        });
      },
    });
  }
}
