import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "phoneFormat",
  standalone: true,
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return "";

    // Limpiar y obtener solo números
    const numbers = value.replace(/\D/g, "");

    // Si no tiene 9 dígitos, devolver sin formatear
    if (numbers.length !== 9) return value;

    // Detectar tipo y formatear
    if (this.isMobile(numbers)) {
      return this.formatMobile(numbers);
    } else {
      return this.formatLandline(numbers);
    }
  }

  private isMobile(value: string): boolean {
    return value.startsWith("6") || value.startsWith("7");
  }

  private formatMobile(value: string): string {
    // 666 666 666
    return `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(
      6,
      9
    )}`;
  }

  private formatLandline(value: string): string {
    const prefix = value.substring(0, 2);
    const twoDigitPrefixes = ["91", "93", "95", "96", "98"];

    if (twoDigitPrefixes.includes(prefix)) {
      // 91 666 66 66
      return `${value.substring(0, 2)} ${value.substring(
        2,
        5
      )} ${value.substring(5, 7)} ${value.substring(7, 9)}`;
    } else {
      // 923 66 66 66
      return `${value.substring(0, 3)} ${value.substring(
        3,
        5
      )} ${value.substring(5, 7)} ${value.substring(7, 9)}`;
    }
  }
}
