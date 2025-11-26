// src/app/shared/components/color-tag/color-tag.component.ts
import { Component, Input } from "@angular/core";
import { TagModule } from "primeng/tag";

type PrimeSeverity =
  | "success"
  | "secondary"
  | "info"
  | "warn"
  | "danger"
  | "contrast";

export type ColorTagVariant =
  | PrimeSeverity
  | "green"
  | "emerald"
  | "lime"
  | "sky"
  | "blue"
  | "indigo"
  | "purple"
  | "pink"
  | "rose"
  | "slate"
  | "zinc"
  | "orange"
  | "teal"
  | "yellow"
  | "black"
  | "white";

@Component({
  selector: "app-color-tag",
  standalone: true,
  imports: [TagModule],
  templateUrl: "./color-tag.component.html",
  styleUrl: "./color-tag.component.scss",
})
export class ColorTagComponent {
  @Input() value = "";
  @Input() variant: ColorTagVariant = "secondary";
  @Input() icon?: string;
  @Input() rounded = false;
  @Input() outlined = false;
  @Input() size: "sm" | "md" | "lg" = "md";
  protected isPrimeSeverity(v: ColorTagVariant): v is PrimeSeverity {
    return [
      "success",
      "secondary",
      "info",
      "warn",
      "danger",
      "contrast",
    ].includes(v as PrimeSeverity);
  }

  protected get severity(): PrimeSeverity | undefined {
    return this.isPrimeSeverity(this.variant) ? this.variant : "secondary";
  }

  protected get cssClass(): string {
    const base = ["app-tag", `app-tag-${this.variant}`, `app-tag-${this.size}`];
    if (this.outlined) base.push("app-tag-outlined");
    return base.join(" ");
  }
}
