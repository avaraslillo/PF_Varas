import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../../shared/shared.module';
import { CoursesDialogModule } from '../courses-dialog/courses-dialog.module';
import { CoursesComponent } from './courses.component';
import { CoursesEffects } from './store/course.effects';
import { courseReducer } from './store/course.reducer';



@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,      
    MatTableModule,
    MatIconModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    CoursesDialogModule,
    StoreModule.forFeature('courses', courseReducer),
    EffectsModule.forFeature([CoursesEffects])
  ],
  exports:[CoursesComponent]
})
export class CoursesModule { }
