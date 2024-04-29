import { TestBed } from '@angular/core/testing';

import { ServicioEstudiantesService } from './servicio-estudiantes.service';

describe('ServicioEstudiantesService', () => {
  let service: ServicioEstudiantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioEstudiantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
