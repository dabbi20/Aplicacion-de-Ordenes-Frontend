import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ModalConfig {
  title: string;
  message: string;
  type: 'success' | 'error' | 'confirm';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalSubject = new BehaviorSubject<ModalConfig | null>(null);
  modal$ = this.modalSubject.asObservable();

  open(config: ModalConfig): void {
    this.modalSubject.next(config);
  }

  close(): void {
    this.modalSubject.next(null);
  }
}