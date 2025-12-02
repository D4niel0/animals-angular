import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { ImageCropperComponent, ImageCroppedEvent } from "ngx-image-cropper";
import { ProfileService } from "../../../services/profile.service";
import { ToastService } from "../../../services/toast.service";
import { finalize } from "rxjs";

@Component({
  selector: "app-profile-image",
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, ImageCropperComponent],
  templateUrl: "./profile-image.component.html",
  styleUrl: "./profile-image.component.scss",
})
export class ProfileImageComponent {
  @Input() currentImageUrl: string | null = null;
  @Output() imageUpdated = new EventEmitter<string>();

  protected cropperVisible = false;
  protected imageChangedEvent: Event | null = null;
  protected pendingCroppedFile: File | null = null;
  protected pendingPreviewUrl: string | null = null;
  protected isUploading = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private profileService: ProfileService,
    private toastService: ToastService
  ) {}

  /**
   * @description Triggers file input click
   */
  protected onChangeImageClick(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  /**
   * @description Handles file selection
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
   * @description Handles image cropped event
   */
  protected imageCropped(event: ImageCroppedEvent): void {
    if (!event.blob) return;

    const file = new File([event.blob], `profile-${Date.now()}.png`, {
      type: event.blob.type || "image/png",
    });
    const previewUrl = event.objectUrl || URL.createObjectURL(file);

    this.pendingCroppedFile = file;
    this.pendingPreviewUrl = previewUrl;
    this.cdr.detectChanges();
  }

  /**
   * @description Cancels cropping
   */
  protected onCropCancel(): void {
    this.cropperVisible = false;
    this.imageChangedEvent = null;
    this.pendingCroppedFile = null;
    this.pendingPreviewUrl = null;
  }

  /**
   * @description Confirms crop and uploads image immediately
   */
  protected onCropConfirm(): void {
    if (!this.pendingCroppedFile) {
      this.onCropCancel();
      return;
    }

    this.uploadProfileImage(this.pendingCroppedFile);
  }

  /**
   * @description Uploads profile image to backend
   */
  private uploadProfileImage(file: File): void {
    this.isUploading = true;

    const formData = new FormData();
    formData.append("profileImage", file, file.name);

    this.profileService
      .uploadProfileImage(formData)
      .pipe(finalize(() => (this.isUploading = false)))
      .subscribe({
        next: (response: { imgUrl: string }) => {
          this.currentImageUrl = response.imgUrl;
          this.imageUpdated.emit(response.imgUrl);
          this.toastService.success(
            "Imagen de perfil actualizada correctamente",
            "Éxito"
          );
          this.onCropCancel();
        },
        error: () => {
          this.onCropCancel();
        },
      });
  }

  /**
   * @description Returns initials from shelter name for placeholder
   */
  protected getInitials(): string {
    return "P";
  }
}
