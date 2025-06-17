import { Injectable } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  show(message: string, type: ToastType = 'info'): void {
    this.toasts.push({ message, type });
    setTimeout(() => {
      this.toasts.shift();
    }, 3000);
  }

  getToasts(): Toast[] {
    return this.toasts;
  }

  success(msg: string) {
    this.show(msg, 'success');
  }

  error(msg: string) {
    this.show(msg, 'error');
  }

  info(msg: string) {
    this.show(msg, 'info');
  }

  warning(msg: string) {
    this.show(msg, 'warning');
  }
}

