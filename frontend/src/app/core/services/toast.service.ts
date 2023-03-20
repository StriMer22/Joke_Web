import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showToast(content: string, isSuccess: boolean = true) {
    this.messageService.add({
      severity: isSuccess ? 'success' : 'error',
      summary: isSuccess ? 'Sukces!' : 'Błąd',
      detail: content,
    });
  }
}
