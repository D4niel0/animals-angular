import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  open(
    message: string,
    type: "success" | "error" | "warning",
    duration: number = 3000
  ) {
    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: [`snackbar-${type}`],
    };

    this.snackBar.open(message, undefined, config);
  }

  openWithAction(
    message: string,
    action: string,
    type: "success" | "error" | "warning"
  ) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: [`snackbar-${type}`],
    });
  }
}
