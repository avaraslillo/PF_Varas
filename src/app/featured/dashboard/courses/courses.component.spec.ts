import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicioCursosService } from '../../../core/services/servicio-cursos.service';
import { SharedModule } from '../../../shared/shared.module';
import { CoursesDialogModule } from '../courses-dialog/courses-dialog.module';
import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let servicioCursosService: ServicioCursosService;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']); // Crear un objeto MatDialogRef falso
    TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [
        HttpClientModule,
        CoursesDialogModule,    
        CommonModule,      
        MatTableModule,
        MatIconModule,
        SharedModule,
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        ServicioCursosService,
        { provide: MatDialogRef, useValue: dialogRefSpy }, // Proporcionar MatDialogRef falso
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(CoursesComponent);
    servicioCursosService = TestBed.inject(ServicioCursosService);
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});