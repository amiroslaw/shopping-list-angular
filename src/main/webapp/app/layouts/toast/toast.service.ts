import { Injectable, TemplateRef  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

  // Push new Toasts to array with content and options
  private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  // Callback method to remove Toast DOM element from view
  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  showSuccess(msg: string, header?: string) {
    this.show(msg, {
      classname: 'bg-success text-light',
      delay: 3000 ,
      autohide: true,
      headertext: header ?? 'Success'
    });
  }
  showError(msg: string, header?: string) {
    this.show(msg, {
      classname: 'bg-danger text-light',
      delay: 3000 ,
      autohide: true,
      headertext: header ?? 'Error!'
    });
  }
}
