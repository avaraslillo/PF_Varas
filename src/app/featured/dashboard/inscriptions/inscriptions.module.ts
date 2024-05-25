import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../../shared/shared.module';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionsEffects } from './store/inscriptions.effects';



@NgModule({
  declarations: [InscriptionsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatDialogContent,
    MatButtonModule,
    MatSelectModule,
    MatLabel,
    MatFormFieldModule,
    SharedModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([InscriptionsEffects])
  ],
  exports: [InscriptionsComponent]
})
export class InscriptionsModule { }
