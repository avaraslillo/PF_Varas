import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ICourse } from '../models/course.model';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrl: './courses-dialog.component.css'
})
export class CoursesDialogComponent {



  isOpen: boolean = false;

  readonlyMode: boolean =false;

  formCurso: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private matDialogRef: MatDialogRef<CoursesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private editingCourse?: ICourse) { 
    this.formCurso= this.formBuilder.group({
      // Define tus controles y sus validadores aquí
      id: ['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
      nombre: ['',[Validators.required,Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ0-9\s]+$/),Validators.min(4)]],
      
    });

    if(editingCourse){
      this.formCurso.patchValue(editingCourse);
      this.readonlyMode = true;
    }
  }

  get idControl() {
    return this.formCurso.get('id');
  }

  get nombreControl() {
    return this.formCurso.get('nombre');
  }

  //@Output() datosEnviados = new EventEmitter<any>();


  onSave(){
    if(this.formCurso.valid){
      this.matDialogRef.close(this.formCurso.value);
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Curso no registrado. Favor, revisar campos inválidos',
      });
      this.formCurso.markAllAsTouched();
    }

  }
}
