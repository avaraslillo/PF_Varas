import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../../shared/shared.module';
import { UsersDialogModule } from '../users-dialog/users-dialog.module';
import { UserEffects } from './store/user.effects';
import { userReducer } from './store/user.reducer';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    SharedModule,
    UsersDialogModule,
    MatDialogModule,
    MatButtonModule,
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  exports: [UsersComponent]
})
export class UsersModule { }
