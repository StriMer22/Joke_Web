import { ToastService } from './../core/services/toast.service';
import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLoginSubmit() {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (_) => {
        this.router.navigate(['/my-jokes']);
      },
      error: ({ error }) => {
        this.toastService.showToast(error.message, false);
      },
    });
  }
}
