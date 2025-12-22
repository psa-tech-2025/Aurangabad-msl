import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent  {

  emailSent = false;
  verified = false;
    message = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async resend() {
  this.message = '';
  try {
    await this.auth.resendVerification();
    this.message = 'Verification email sent again.';
  } catch {
    this.message = 'Please login again to resend.';
  }
}


  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
