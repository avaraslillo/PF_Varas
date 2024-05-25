import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../../shared/shared.module';
import { StudentDialogModule } from '../student-dialog/student-dialog.module';
import { StudentEffects } from './store/student.effects';
import { studentReducer } from './store/student.reducer';
import { StudentsPageComponent } from './students-page.component';



  @NgModule({
    declarations: [StudentsPageComponent],
    imports: [
      CommonModule,
      MatTableModule,
      MatIconModule,
      SharedModule,
      StudentDialogModule,
      MatDialogModule,
      MatButtonModule,
      StoreModule.forFeature('students', studentReducer),
      EffectsModule.forFeature([StudentEffects]),
    ],
    exports: [
      StudentsPageComponent
    ]
  })
  export class StudentsPageModule {
  };

