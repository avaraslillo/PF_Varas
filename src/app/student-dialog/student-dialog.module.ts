import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { StudentDialogComponent } from './student-dialog.component';



@NgModule({
  declarations: [StudentDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatDialogContent,
    MatButtonModule,
    MatLabel,
    MatFormFieldModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: []},
  ],
  exports:[
    StudentDialogComponent
  ]
})
export class StudentDialogModule { }
