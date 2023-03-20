import { AuthService } from './../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from './../core/services/toast.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.controls?.['password'].value;
    const confirmPassword = group.controls?.['confirmPassword'].value;

    if (password !== confirmPassword) {
      group.controls?.['confirmPassword'].setErrors({ passwordMismatch: true });
    } else {
      group.controls?.['confirmPassword'].setErrors(null);
    }
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      this.authService.register(username, password).subscribe({
        next: (_) => {
          this.toastService.showToast('Zostało utworzone nowe konto.');
          this.router.navigate(['/my-jokes']);
        },
        error: ({ error }) => {
          this.toastService.showToast(error.message, false);
        },
      });
    }
  }
}
