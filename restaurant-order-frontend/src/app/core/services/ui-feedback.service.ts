import { Injectable, signal } from '@angular/core';

export interface SuccessModalData {
  title: string;
  message: string;
  primaryButtonText?: string;
  onCloseRedirectTo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UiFeedbackService {
  readonly isSuccessModalOpen = signal(false);
  readonly successModalData = signal<SuccessModalData | null>(null);

  openSuccessModal(data: SuccessModalData): void {
    this.successModalData.set(data);
    this.isSuccessModalOpen.set(true);
  }

  closeSuccessModal(): void {
    this.isSuccessModalOpen.set(false);
    this.successModalData.set(null);
  }
}