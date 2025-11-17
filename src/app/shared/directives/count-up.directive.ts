import { Directive, ElementRef, Input, OnChanges } from "@angular/core";

@Directive({
  selector: "[appCountUp]",
  standalone: true,
})
export class CountUpDirective implements OnChanges {
  @Input() endValue = 0;
  @Input() duration = 1200;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.animateCount(0, this.endValue, this.duration);
  }

  animateCount(start: number, end: number, duration: number) {
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      this.el.nativeElement.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}
