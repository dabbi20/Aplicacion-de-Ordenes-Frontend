import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="modal$ | async as modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        
        <h2 class="mb-2 text-xl font-bold text-slate-800">
          {{ modal.title }}
        </h2>

        <p class="mb-6 text-slate-600">
          {{ modal.message }}
        </p>

        <div class="flex justify-end gap-3">
          <button
            *ngIf="modal.type === 'confirm'"
            (click)="close()"
            class="rounded-lg border px-4 py-2"
          >
            {{ modal.cancelText || 'Cancelar' }}
          </button>

          <button
            (click)="confirm(modal)"
            class="rounded-lg bg-slate-900 px-4 py-2 text-white"
          >
            {{ modal.confirmText || 'Aceptar' }}
          </button>
        </div>

      </div>
    </div>
  `
})
export class ModalComponent {
  private modalService = inject(ModalService);
  modal$ = this.modalService.modal$;

  close() {
    this.modalService.close();
  }

  confirm(modal: any) {
    modal.onConfirm?.();
    this.close();
  }
}