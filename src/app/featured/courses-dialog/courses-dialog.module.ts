import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../shared/shared.module';
import { CoursesDialogComponent } from './courses-dialog.component';



@NgModule({
  declarations: [CoursesDialogComponent],
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
  exports:[CoursesDialogComponent]
})
export class CoursesDialogModule { }
