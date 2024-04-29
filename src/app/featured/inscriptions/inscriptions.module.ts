import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../shared/shared.module';
import { InscriptionsComponent } from './inscriptions.component';



@NgModule({
  declarations: [InscriptionsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatDialogContent,
    MatButtonModule,
    MatOption,
    MatSelect,
    MatLabel,
    MatFormFieldModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [InscriptionsComponent]
})
export class InscriptionsModule { }
