import { Component, inject, Input } from "@angular/core";
import { Animal } from "../../models";
import { SharedModuleModule } from "../../shared-module/shared-module.module";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { ScrollService } from "../../../services/scroll.service";

@Component({
  selector: "app-cards",
  standalone: true,
  imports: [SharedModuleModule, MatIconModule],
  templateUrl: "./cards.component.html",
  styleUrl: "./cards.component.scss",
})
export class CardsComponent {
  @Input() animal: Animal | null = null;
  private router = inject(Router);
  private scrollService = inject(ScrollService);

  private getCssPath(el: Element | null): string | undefined {
    if (!el || el.nodeType !== 1) return undefined;
    const elem = el as Element;
    if (elem.id) return `#${elem.id}`;
    const parts: string[] = [];
    let current: Element | null = elem;
    while (
      current &&
      current.nodeType === 1 &&
      current.tagName.toLowerCase() !== "html"
    ) {
      let part = current.tagName.toLowerCase();
      if (current.classList && current.classList.length) {
        const cls = Array.from(current.classList).find(
          (c) => !/^mat-|^ng-/.test(c)
        );
        if (cls) part += `.${cls}`;
      }
      const parent = current.parentElement;
      if (parent) {
        const children = Array.from(parent.children).filter(
          (ch) => ch.tagName === current!.tagName
        );
        if (children.length > 1) {
          const idx = children.indexOf(current) + 1;
          part += `:nth-of-type(${idx})`;
        }
      }
      parts.unshift(part);
      current = current.parentElement;
    }
    return parts.length ? parts.join(" > ") : undefined;
  }

  private isScrollable(el: Element): boolean {
    const style = window.getComputedStyle(el);
    const overflowY = style.overflowY;
    return (
      (overflowY === "auto" || overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight
    );
  }

  private findScrollableAncestor(start: Element | null): Element | null {
    let el: Element | null = start;
    while (el) {
      if (this.isScrollable(el)) return el;
      el = el.parentElement;
    }
    const candidates = [
      document.querySelector(".main-content"),
      document.querySelector(".mat-drawer-content"),
      document.scrollingElement as Element | null,
      document.body,
    ];
    for (const c of candidates) {
      if (c && this.isScrollable(c)) return c;
    }
    return null;
  }

  goToDetails(eventOrId: any, maybeId?: number | undefined): void {
    let id: number | undefined;
    let startEl: Element | null = null;

    if (typeof maybeId === "undefined") {
      id = eventOrId;
      startEl = eventTargetFromCaller() || null;
    } else {
      const ev = eventOrId as MouseEvent;
      id = maybeId;
      startEl = ev.currentTarget as Element;
    }

    if (!startEl && (eventOrId as MouseEvent)?.target) {
      startEl = ((eventOrId as MouseEvent).target as Element) || null;
    }

    const scrollable = this.findScrollableAncestor(startEl);
    let pos = 0;
    let selector: string | undefined;

    if (scrollable) {
      pos = (scrollable as HTMLElement).scrollTop;
      selector = this.getCssPath(scrollable);
    } else {
      pos = window.scrollY || document.documentElement.scrollTop || 0;
    }

    this.scrollService.set("animals", { y: pos, selector });
    this.router.navigateByUrl("/animals-home/" + id);
  }
}

function eventTargetFromCaller(): Element | null {
  return null;
}
