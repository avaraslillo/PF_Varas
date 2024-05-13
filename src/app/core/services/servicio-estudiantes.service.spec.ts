import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { IStudent } from '../../featured/dashboard/models/student.model';
import { ServicioEstudiantesService } from './servicio-estudiantes.service';

describe('ServicioEstudiantesService', () => {
  let service: ServicioEstudiantesService;
  let httpMock: HttpTestingController;
  let urlService: string = environment.baseAPIURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicioEstudiantesService]
    });
    service = TestBed.inject(ServicioEstudiantesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe ser creado', () => {
    
    expect(service).toBeTruthy();
    expect(service['http'] instanceof HttpClient).toBeTruthy();
  });

  it('Debe retornar un Observable que emita un arreglo de objetos de tipo IStudent', () => {
    const students: IStudent[] = [
      { id: 1, nombres: 'John', apellidos: 'Doe', email: 'john.doe@example.com' ,createdAt: new Date()},
      { id: 2, nombres: 'Jane', apellidos: 'Doe', email: 'jane.doe@example.com', createdAt: new Date()}
    ];
    const expectedUrl = urlService + '/students';

    service.obtenerListadoEstudiantes().subscribe(result => {
      expect(result).toEqual(students);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(students);
  });

  it('Debe hacer una petición GET a la URL correcta', () => {
    const expectedUrl = urlService + '/students';

    service.obtenerListadoEstudiantes().subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('Debe retrasar la emisión de la respuesta en 500 ms', (done) => {
    const students: IStudent[] = [
      { id: 1, nombres: 'John', apellidos: 'Doe', email: 'john.doe@example.com', createdAt: new Date() },
      { id: 2, nombres: 'Jane', apellidos: 'Doe', email: 'jane.doe@example.com',createdAt: new Date() }
    ];
    const expectedUrl = urlService + '/students';

    service.obtenerListadoEstudiantes().subscribe((result) => {
      setTimeout(() => {
        expect(result).toEqual(students);
        done();
      }, 600);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    setTimeout(() => {
      req.flush(students);
    }, 500);
  });

  it('Debe ingresar a un estudiante', () => {
    const student = { id: 1, nombres: 'Test', apellidos: 'Student', email: 'test@example.com', createdAt: new Date() };
    service.agregarEstudiante(student).subscribe(response => {
      expect(response).toEqual(student);
    });
    const req = httpMock.expectOne(`${urlService}/students/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(student);
    req.flush(student);
  });

  it('Debe modificar a un estudiante', () => {
    const student: IStudent = { id: 1, nombres: 'John', apellidos: 'Doe', email: 'john.doe@example.com', createdAt: new Date() };
    service.modificarEstudiante(student).subscribe(response => {
      expect(response).toEqual(student);
    });
    const req = httpMock.expectOne(`${urlService}/students/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(student);
  });

  it('Debe manejar un error cuando se modifique a un estudiante', () => {
    const student: IStudent = { id: 1, nombres: 'John', apellidos: 'Doe', email: 'john.doe@example.com',createdAt: new Date() };
    service.modificarEstudiante(student).subscribe(
      () => fail('The request should have failed'),
      error => expect(error.status).toBe(500)
    );
    const req = httpMock.expectOne(`${urlService}/students/1`);
    expect(req.request.method).toBe('PUT');
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });

});
