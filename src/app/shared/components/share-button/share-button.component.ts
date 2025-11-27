import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";
import { SpeedDialModule } from "primeng/speeddial";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-share-button",
  standalone: true,
  imports: [SpeedDialModule, ButtonModule, TooltipModule],
  templateUrl: "./share-button.component.html",
  styleUrl: "./share-button.component.scss",
})
export class ShareButtonComponent {
  items: MenuItem[] = [];

  constructor() {
    const url = window.location.href;
    const encodedUrl = encodeURIComponent(url);

    this.items = [
      {
        icon: "pi pi-facebook",
        tooltipOptions: {
          tooltipLabel: "Compartir en Facebook",
          tooltipPosition: "left",
        },
        command: () => {
          const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
          window.open(shareUrl, "_blank", "noopener");
        },
      },
      {
        icon: "pi pi-instagram",
        tooltipOptions: {
          tooltipLabel: "Abrir Instagram",
          tooltipPosition: "left",
        },
        command: () => {
          window.open("https://www.instagram.com", "_blank", "noopener");
        },
      },
      {
        icon: "pi pi-twitter",
        tooltipOptions: {
          tooltipLabel: "Compartir en X",
          tooltipPosition: "left",
        },
        command: () => {
          const text = encodeURIComponent("Mira esto");
          const shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`;
          window.open(shareUrl, "_blank", "noopener");
        },
      },
    ];
  }
}
