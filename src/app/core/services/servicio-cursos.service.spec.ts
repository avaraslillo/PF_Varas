import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServicioCursosService } from './servicio-cursos.service';

describe('ServicioCursosService', () => {
  let service: ServicioCursosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicioCursosService]
    });
    service = TestBed.inject(ServicioCursosService);
    httpMock = TestBed.inject(HttpTestingController);
    
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe ser creado', () => {
    
    expect(service).toBeTruthy();
    expect(service['http'] instanceof HttpClient).toBeTruthy();
  });
});
