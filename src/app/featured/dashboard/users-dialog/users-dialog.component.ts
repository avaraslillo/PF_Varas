import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import Swal from 'sweetalert2';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrl: './users-dialog.component.css'
})
export class UsersDialogComponent {

  isOpen: boolean = false;

  formUsuario: FormGroup;



  constructor(private formBuilder: FormBuilder,
              private matDialogRef: MatDialogRef<UsersDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private editingUser?: IUser) { 
    this.formUsuario= this.formBuilder.group({
      // Define tus controles y sus validadores aquí
      
      email: ['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      nombre: ['',[Validators.required,Validators.minLength(4)]],
      direccion: ['',[Validators.required,Validators.minLength(10)]],
      telefono: ['',[Validators.required,Validators.minLength(6)]],
      profile: ["",[Validators.required]],
    });

    if(editingUser){
      this.formUsuario.patchValue(editingUser);
      if(editingUser.id=="1"){
        this.formUsuario.controls['profile'].disable();
      }
    }
  }

  get emailControl() {
    return this.formUsuario.get('email');
  }

  get contraseniaControl() {
    return this.formUsuario.get('password');
  }

  get nombreControl() {
    return this.formUsuario.get('nombre');
  }

  get direccionControl() {
    return this.formUsuario.get('direccion');
  }

  get telefonoControl() {
    return this.formUsuario.get('telefono');
  }

  get profileControl() {
    return this.formUsuario.get('profile');
  }

  //@Output() datosEnviados = new EventEmitter<any>();


  onSave(){
    if(this.formUsuario.valid){
      const userToSave = this.formUsuario.getRawValue();
      this.matDialogRef.close(userToSave);
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario no registrado. Favor, revisar campos inválidos',
      });
      this.formUsuario.markAllAsTouched();
    }
  }
  
  onDropdownOpened(select: MatSelect) {
    if (!select.panelOpen) {
      select.close();
    }
  }

}
