import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";

@Directive({
  selector: "[appPhoneFormat]",
  standalone: true,
})
export class PhoneFormatDirective implements OnInit {
  private previousValue = "";

  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {
    // Formatear valor inicial si existe
    setTimeout(() => {
      this.formatCurrentValue();
    }, 0);
  }

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent): void {
    // Permitir: Backspace, Delete, Tab, Escape, Enter
    if (["Backspace", "Delete", "Tab", "Escape", "Enter"].includes(event.key)) {
      return;
    }

    // Permitir: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    // Permitir: Home, End, flechas
    if (["Home", "End", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      return;
    }

    // Prevenir si NO es un número
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener("input", ["$event"])
  onInput(event: Event): void {
    this.formatCurrentValue();
  }

  @HostListener("blur")
  onBlur(): void {
    // Re-formatear al perder el foco (por si se pegó o cambió programáticamente)
    this.formatCurrentValue();
  }

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData("text") || "";
    const numbers = pastedText.replace(/\D/g, "").substring(0, 9);

    const input = this.el.nativeElement;
    input.value = numbers;

    // Trigger input event para aplicar formato
    input.dispatchEvent(new Event("input"));
  }

  private formatCurrentValue(): void {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, ""); // Solo números

    // Limitar a 9 dígitos
    if (value.length > 9) {
      value = value.substring(0, 9);
    }

    // Formatear según tipo
    let formatted = "";

    if (value.length === 0) {
      formatted = "";
    } else if (this.isMobile(value)) {
      // Móvil: 666 666 666
      formatted = this.formatMobile(value);
    } else {
      // Fijo: 91 666 66 66
      formatted = this.formatLandline(value);
    }

    // Solo actualizar si cambió
    if (formatted !== this.previousValue) {
      input.value = formatted;
      this.previousValue = formatted;

      // Mantener cursor al final solo si el usuario está escribiendo
      if (document.activeElement === input) {
        const cursorPosition = formatted.length;
        input.setSelectionRange(cursorPosition, cursorPosition);
      }
    }
  }

  private isMobile(value: string): boolean {
    // Móviles españoles: 6XX XXX XXX o 7XX XXX XXX
    return value.startsWith("6") || value.startsWith("7");
  }

  private formatMobile(value: string): string {
    // 666 666 666
    const parts: string[] = [];

    if (value.length > 0) parts.push(value.substring(0, 3));
    if (value.length > 3) parts.push(value.substring(3, 6));
    if (value.length > 6) parts.push(value.substring(6, 9));

    return parts.join(" ");
  }

  private formatLandline(value: string): string {
    const prefix = value.substring(0, 2);
    const twoDigitPrefixes = ["91", "93", "95", "96", "98"];

    if (twoDigitPrefixes.includes(prefix)) {
      // 91 666 66 66 (2+3+2+2)
      const parts: string[] = [];

      if (value.length > 0) parts.push(value.substring(0, 2));
      if (value.length > 2) parts.push(value.substring(2, 5));
      if (value.length > 5) parts.push(value.substring(5, 7));
      if (value.length > 7) parts.push(value.substring(7, 9));

      return parts.join(" ");
    } else {
      // 923 66 66 66 (3+2+2+2)
      const parts: string[] = [];

      if (value.length > 0) parts.push(value.substring(0, 3));
      if (value.length > 3) parts.push(value.substring(3, 5));
      if (value.length > 5) parts.push(value.substring(5, 7));
      if (value.length > 7) parts.push(value.substring(7, 9));

      return parts.join(" ");
    }
  }
}
