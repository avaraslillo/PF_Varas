import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ServicioAuthService } from '../../core/services/servicio-auth.service';
import { SharedModule } from '../../shared/shared.module';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: ServicioAuthService;
  let router: Router;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatLabel,
        MatFormFieldModule,
        SharedModule,
        ReactiveFormsModule,
        MatCardModule
      ],
      providers: [
        provideAnimations()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthComponent);
    authService = TestBed.inject(ServicioAuthService);
    router = TestBed.inject(Router);
    fb = TestBed.inject(FormBuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
