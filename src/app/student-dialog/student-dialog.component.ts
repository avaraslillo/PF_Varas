import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { IStudent } from '../models/student.model';


@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.css'
})
export class StudentDialogComponent {



  isOpen: boolean = false;

  formEstudiante: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private matDialogRef: MatDialogRef<StudentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private editingStudent?: IStudent) { 
    this.formEstudiante= this.formBuilder.group({
      // Define tus controles y sus validadores aquí
      nombres: ['',[Validators.required,Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/)]],
      apellidos: ['',[Validators.required,Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/)]],
      
      email: ['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    });

    if(editingStudent){
      this.formEstudiante.patchValue(editingStudent);
    }
  }

  get nombresControl() {
    return this.formEstudiante.get('nombres');
  }

  get apellidosControl() {
    return this.formEstudiante.get('apellidos');
  }

  get emailControl() {
    return this.formEstudiante.get('email');
  }

  //@Output() datosEnviados = new EventEmitter<any>();


  onSave(){
    if(this.formEstudiante.valid){
      this.matDialogRef.close(this.formEstudiante.value);
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario no registrado. Favor, revisar campos inválidos',
      });
      this.formEstudiante.markAllAsTouched();
    }

  }
}
