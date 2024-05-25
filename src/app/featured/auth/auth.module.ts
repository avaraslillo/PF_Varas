import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { AuthComponent } from './auth.component';
import { AuthEffects } from './store/auth.effects';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatLabel,
    MatFormFieldModule,
    SharedModule,
    ReactiveFormsModule,
    MatCardModule,
    EffectsModule.forFeature([AuthEffects])
  ],
  exports:[
    AuthComponent
  ]
})
export class AuthModule { }
