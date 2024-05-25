import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../../environments/environment.development';
import { LoginData } from '../../featured/auth/models/auth.model';
import { IUser } from '../../featured/dashboard/models/user.model';
import { ServicioUsuariosService } from './servicio-usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioAuthService {
  /*private MOCK_AUTH_USER: IStudent = {
    id: "1",
    createdAt: new Date(),
    email: 'email@mail.com',
    nombres: 'Alex',
    apellidos: 'Varas Lillo'
  };*/

  private _authUser$ = new BehaviorSubject<IUser | null>(null);
  public authUser$ = this._authUser$.asObservable();
  private urlAPI=environment.baseAPIURL;

  constructor(private router: Router,
              private servicioUsuarios: ServicioUsuariosService
  ) {}

  /*login(data: LoginData): Observable<any> {
    return new Observable<any>(observer => {
      if (data.email !== 'user@mail.com' || data.password !== '123456') {
        alert('Correo o password incorrectos');
        observer.error('Correo o password incorrectos');
      } else {
        this._authUser$.next(this.MOCK_AUTH_USER);
        localStorage.setItem(
          'accessToken',
          uuidv4()
        );
        this.router.navigate(['dashboard', 'welcome']);
        observer.next(this.MOCK_AUTH_USER);
        observer.complete();
      }
    });
  }*/

  login(data: LoginData): Observable<any> {
    return this.servicioUsuarios.validarUsuario(data).pipe(
      map(response => {
        if (response) {
          this._authUser$.next(response);
          localStorage.setItem('accessToken', uuidv4());
          this.router.navigate(['dashboard', 'welcome']);
          return response;
        } else {
          throw new Error('Correo o password incorrectos');
        }
      }),
      catchError(error => {
        alert('Correo o password incorrectos');
        throw error;
      })
    );
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this._authUser$.next(this._authUser$.value);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('accessToken');
  }
}
