import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ServicioAuthService } from '../../core/services/servicio-auth.service';
import { AuthActions } from './store/auth.actions';
import { AuthState } from './store/auth.reducer';
import { selectAuthError, selectIsLoading } from './store/auth.selector';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnDestroy, OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private authService: ServicioAuthService,
    private router: Router,
    private fb: FormBuilder,

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.error$ = this.store.pipe(select(selectAuthError));
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
      const loginData={
        email: this.emailControl?.value,
        password: this.passwordControl?.value
      }
      this.store.dispatch((AuthActions.login({logindata: loginData})));

      //this.authService.login();
      
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
