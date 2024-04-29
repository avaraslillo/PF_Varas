import { TestBed } from '@angular/core/testing';

import { ServicioInscripcionesService } from './servicio-inscripciones.service';

describe('ServicioInscripcionesService', () => {
  let service: ServicioInscripcionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioInscripcionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
