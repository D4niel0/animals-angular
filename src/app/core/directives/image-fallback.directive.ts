import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "img[appImageFallback]",
  standalone: true,
})
export class ImageFallbackDirective {
  @Input() appImageFallback: string = "/assets/images/placeholder.png";

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener("error")
  onError(): void {
    const img = this.el.nativeElement;

    const fallbackSrc =
      this.appImageFallback || "/assets/images/placeholder.png";

    if (img.src !== fallbackSrc && !img.src.includes("placeholder.png")) {
      img.src = fallbackSrc;
      img.alt = "Imagen no disponible";
    }
  }

  @HostListener("load")
  onLoad(): void {
    this.el.nativeElement.classList.remove("image-loading");
    this.el.nativeElement.classList.add("image-loaded");
  }
}
