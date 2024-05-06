import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioAuthService } from '../../core/services/servicio-auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnDestroy, OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: ServicioAuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue());
      
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
