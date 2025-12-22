import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  loading = false;
  error = '';

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}
  async submit() {
  if (this.form.invalid) {
    console.log('FORM INVALID', this.form.value);
    return;
  }

  console.log('REGISTER START', this.form.value);

  try {
    const { name, email, mobile, password } = this.form.value;

    await this.auth.register(name!, email!, mobile!, password!);

    console.log('REGISTER SUCCESS');

    this.router.navigate(['/verify-email']);

  } catch (err: any) {
    console.error('REGISTER ERROR', err);
    this.error = err.message;
  }
}



}
