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
          ValidationService.passwordValidator
        ]
      ]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.message = 'Trying to log in ...';

    this.authService.login(this.loginForm.value).subscribe(res => {
      if (res.success) {
        // Redirect the dashboard
        localStorage.setItem('token', res.Token);
        //  alert(res.Token);
        this.coreService.navigateTo('/dashboard');
        this.coreService.showSuccess(res.message);
      } else {
        alert('esle');
        this.coreService.showError(res.message);
      }
    },
      (err) => {
        this.coreService.showError(err.message);
      }
    );
  }
  get formControls() {
    return this.loginForm.controls;
  }
}
