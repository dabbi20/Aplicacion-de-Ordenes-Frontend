import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UiFeedbackService } from '../../../core/services/ui-feedback.service';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="uiFeedbackService.isSuccessModalOpen()"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 px-4"
    >
      <div class="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            class="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 class="text-center text-2xl font-bold text-slate-900">
          {{ uiFeedbackService.successModalData()?.title }}
        </h2>

        <p class="mt-3 text-center text-sm leading-6 text-slate-600">
          {{ uiFeedbackService.successModalData()?.message }}
        </p>

        <div class="mt-6">
          <button
            type="button"
            (click)="handleClose()"
            class="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {{ uiFeedbackService.successModalData()?.primaryButtonText || 'Entendido' }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class SuccessModalComponent {
  readonly uiFeedbackService = inject(UiFeedbackService);
  private readonly router = inject(Router);

  handleClose(): void {
    const redirectTo = this.uiFeedbackService.successModalData()?.onCloseRedirectTo;

    this.uiFeedbackService.closeSuccessModal();

    if (redirectTo) {
      this.router.navigate([redirectTo]);
    }
  }
}