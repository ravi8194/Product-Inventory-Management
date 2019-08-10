import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  constructor(private toastr: ToastrService, private router: Router) {}
  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showError(message: string) {
    this.toastr.error(message);
  }
  showWarning(message: string) {
    this.toastr.warning(message);
  }
  showInfo(message: string) {
    this.toastr.info(message);
  }
  navigateTo(url) {
    this.router.navigate([url]);
  }
}
