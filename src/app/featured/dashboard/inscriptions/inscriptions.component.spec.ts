import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatLabel, MatSelect } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ServicioCursosService } from '../../../core/services/servicio-cursos.service';
import { ServicioEstudiantesService } from '../../../core/services/servicio-estudiantes.service';
import { ServicioInscripcionesService } from '../../../core/services/servicio-inscripciones.service';
import { SharedModule } from '../../../shared/shared.module';
import { InscriptionsComponent } from './inscriptions.component';

describe('InscriptionsComponent', () => {
  let component: InscriptionsComponent;
  let fixture: ComponentFixture<InscriptionsComponent>;
  let servicioEstudiantes: ServicioEstudiantesService;
  let servicioCursos: ServicioCursosService;
  let servicioInscripciones: ServicioInscripcionesService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionsComponent],
      imports: [HttpClientModule, 
                HttpClientTestingModule,
                CommonModule,
                MatTableModule,
                MatDialogModule,
                MatInputModule,
                MatIconModule,
                MatDialogContent,
                MatButtonModule,
                MatOption,
                MatSelect,
                MatLabel,
                MatFormFieldModule,
                SharedModule,
                ReactiveFormsModule],
      providers: [ServicioEstudiantesService,ServicioInscripcionesService,ServicioCursosService,HttpClientModule,provideAnimations()]
    })
    .compileComponents();
  
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionsComponent);

    component = fixture.componentInstance;
    servicioEstudiantes = TestBed.inject(ServicioEstudiantesService);
    servicioCursos = TestBed.inject(ServicioCursosService);
    servicioInscripciones = TestBed.inject(ServicioInscripcionesService);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
