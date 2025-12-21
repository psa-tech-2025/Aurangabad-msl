import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
loginForm! : FormGroup;
loginFailed =false

 constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
  //   const { email, password } = this.loginForm.value;
  //   if (email === this.validEmail && password === this.validPassword) {
  //     this.router.navigate(['/dashboard']);
  //   } else {
  //     this.loginFailed = true;
  //   }
  // }

}
}
