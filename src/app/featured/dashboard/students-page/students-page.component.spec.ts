import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ServicioEstudiantesService } from '../../../core/services/servicio-estudiantes.service';
import { IStudent } from '../models/student.model';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { StudentDialogModule } from '../student-dialog/student-dialog.module';
import { StudentsPageComponent } from './students-page.component';

describe('StudentsPageComponent', () => {
  let component: StudentsPageComponent;
  //let studentDialogSpy: jasmine.SpyObj<MatDialog>;
  //let servicioEstudiantesSpy: jasmine.SpyObj<ServicioEstudiantesService>;
  let servicioEstudiantesService: ServicioEstudiantesService;
  let dialogoEstudiante: StudentDialogComponent;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<StudentDialogComponent>>;


  beforeEach(() => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule,StudentDialogModule,MatDialogModule, BrowserAnimationsModule],
      providers: [StudentsPageComponent, 
        ServicioEstudiantesService, 
        [{ provide: MatDialog, useValue: dialogSpy }],]
    });
    component = TestBed.inject(StudentsPageComponent);
    servicioEstudiantesService = TestBed.inject(ServicioEstudiantesService);
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
  });

  it('Debe abrir un diálogo cuando abrirFormulario es llamado', () => {
    const mockDialogRef = jasmine.createSpyObj(['afterClosed']);
    matDialogSpy.open.and.returnValue(mockDialogRef);
    mockDialogRef.afterClosed.and.returnValue(of(undefined));

    component.abrirFormulario();

    expect(matDialogSpy.open).toHaveBeenCalledWith(StudentDialogComponent, { data: undefined });
  });

  it('Debe actualizar listadoEstudiantes y dataSource correctamente cuando se llame a actualizarListadoEstudiantes', () => {
    const validData: IStudent[] = [{ id: "1", nombres: 'Alice',apellidos: 'Smith', email: 'alice.smith@amestris.com', createdAt: new Date() }];
    spyOn(servicioEstudiantesService, 'obtenerListadoEstudiantes').and.returnValue(of(validData));

    component.actualizarListadoEstudiantes();

    expect(component.listadoEstudiantes).toEqual(validData);
    expect(component.dataSource.data).toEqual(validData);
  });

  it('Debe setear listadoEstudiantes a un arreglo vacío cuando next es llamado sin datos', () => {
    spyOn(servicioEstudiantesService, 'obtenerListadoEstudiantes').and.returnValue(of([]));

    component.actualizarListadoEstudiantes();

    expect(component.listadoEstudiantes).toEqual([]);
    expect(component.dataSource.data).toEqual([]);
  });

  it('Debe llamar ngOnDestroy cuando complete es llamado', () => {
    spyOn(component, 'ngOnDestroy');
    spyOn(servicioEstudiantesService, 'obtenerListadoEstudiantes').and.returnValue(of([]));

    component.actualizarListadoEstudiantes();
    

    expect(component.ngOnDestroy).toHaveBeenCalled();
  });
});

