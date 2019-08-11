import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ValidationService } from 'src/app/shared/validation.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  loginForm: FormGroup;
  isSubmitted: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private coreService: CoreService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      user_name: ['', [Validators.required, Validators.maxLength(20)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(res => {
        if (res.success) {
          // set token to localstorage
          localStorage.setItem('token', res.Token);
          // Redirect the dashboard
          this.coreService.navigateTo('/dashboard');
          // Toaster Message
          this.coreService.showSuccess(res.message);
          this.isSubmitted = false;
        } else {
          this.coreService.showError(res.message);
        }
      },
        // execute when error in api calling
        (err) => {
          this.coreService.showError(err.message);
        }
      );
    }

  }
  // getting controls of form fields
  get formControls() {
    return this.loginForm.controls;
  }
}
