import { inject, Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private messageService = inject(MessageService);
  private readonly TOAST_LIFE = 5000;

  success(message: string, summary?: string) {
    this.messageService.add({
      severity: "success",
      summary: summary || "Éxito",
      detail: message,
      life: this.TOAST_LIFE,
    });
  }

  info(message: string, summary?: string) {
    this.messageService.add({
      severity: "info",
      summary: summary || "Info",
      detail: message,
      life: this.TOAST_LIFE,
    });
  }

  warn(message: string, summary?: string) {
    this.messageService.add({
      severity: "warn",
      summary: summary || "Advertencia",
      detail: message,
      life: this.TOAST_LIFE,
    });
  }

  error(message: string, summary?: string) {
    this.messageService.add({
      severity: "error",
      summary: summary || "Error",
      detail: message,
      life: this.TOAST_LIFE,
    });
  }
}
