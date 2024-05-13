import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServicioInscripcionesService } from './servicio-inscripciones.service';

describe('ServicioInscripcionesService', () => {
  let service: ServicioInscripcionesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicioInscripcionesService]
    });
    service = TestBed.inject(ServicioInscripcionesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('Debe ser creado', () => {
    expect(service).toBeTruthy();
    expect(service['http'] instanceof HttpClient).toBeTruthy();
  });
});
