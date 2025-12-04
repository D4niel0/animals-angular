import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";
import { ImageCropperComponent, ImageCroppedEvent } from "ngx-image-cropper";
import { ImageFallbackDirective } from "../../../core/directives/image-fallback.directive";

interface AnimalImageItem {
  previewUrl: string;
  file?: File;
}

@Component({
  selector: "app-animal-images",
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    TooltipModule,
    ImageCropperComponent,
    ImageFallbackDirective,
  ],
  templateUrl: "./animal-images.component.html",
  styleUrl: "./animal-images.component.scss",
})
export class AnimalImagesComponent implements OnChanges {
  @Input() maxImages = 5;
  @Input() initialImages: string[] = [];

  @Output() imagesChange = new EventEmitter<string[]>();

  @Output() filesChange = new EventEmitter<File[]>();

  protected images: AnimalImageItem[] = [];

  protected cropperVisible = false;
  protected imageChangedEvent: Event | null = null;
  private pendingCroppedFile: File | null = null;
  protected pendingPreviewUrl: string | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["initialImages"] && changes["initialImages"].firstChange) {
      this.images = (this.initialImages ?? []).map((url) => ({
        previewUrl: url,
      }));
      this.emitOutputs();
    }
  }

  get canAddMore(): boolean {
    return this.images.length < this.maxImages;
  }

  /**
   * @description Handles the click event to add a new image.
   * @param fileInput HTML input element for file selection
   * @returns void
   */
  protected onAddClick(fileInput: HTMLInputElement): void {
    if (!this.canAddMore) return;
    fileInput.click();
  }

  /**
   * @description Handles the file selection event.
   * @param event The file input change event
   * @returns void
   */
  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.imageChangedEvent = event;
    this.pendingCroppedFile = null;
    this.pendingPreviewUrl = null;
    this.cropperVisible = true;
  }

  /**
   * @description Handles the image cropped event.
   * @param event The image cropped event
   * @returns void
   */
  protected imageCropped(event: ImageCroppedEvent): void {
    if (!event.blob) {
      return;
    }

    const file = new File([event.blob], `animal-${Date.now()}.png`, {
      type: event.blob.type || "image/png",
    });
    const previewUrl = event.objectUrl || URL.createObjectURL(file);

    this.pendingCroppedFile = file;
    this.pendingPreviewUrl = previewUrl;

    this.cdr.detectChanges();
  }

  /**
   * @description Handles the cancel action of the image cropper dialog.
   * @returns void
   */
  protected onCropCancel(): void {
    this.cropperVisible = false;
    this.imageChangedEvent = null;
    this.pendingCroppedFile = null;
    this.pendingPreviewUrl = null;
  }

  /**
   * @description Handles the confirm action of the image cropper dialog.
   * @returns void
   */
  protected onCropConfirm(): void {
    if (!this.pendingPreviewUrl || !this.canAddMore) {
      this.onCropCancel();
      return;
    }

    this.images = [
      ...this.images,
      {
        previewUrl: this.pendingPreviewUrl,
        file: this.pendingCroppedFile ?? undefined,
      },
    ];

    this.emitOutputs();
    this.onCropCancel();
  }

  /**
   * @description Handles the removal of an image at a specified index.
   * @param index The index of the image to remove
   * @returns void
   */
  protected removeImage(index: number): void {
    this.images = this.images.filter((_, i) => i !== index);
    this.emitOutputs();
  }

  /**
   * @description Emits the current images and files to the parent component.
   * @returns void
   */
  private emitOutputs(): void {
    const previews = this.images.map((i) => i.previewUrl);
    const files = this.images.map((i) => i.file).filter((f): f is File => !!f);

    this.imagesChange.emit(previews);
    this.filesChange.emit(files);
  }
}
