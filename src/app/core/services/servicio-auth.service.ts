import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { LoginData } from '../../featured/auth/models/auth.model';
import { IStudent } from '../../featured/dashboard/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioAuthService {
  private MOCK_AUTH_USER: IStudent = {
    id: 1,
    createdAt: new Date(),
    email: 'email@mail.com',
    nombres: 'Alex',
    apellidos: 'Varas Lillo'
  };

  private _authUser$ = new BehaviorSubject<IStudent | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) {}

  login(data: LoginData): void {
    console.log(data);
    if (data.email !== 'user@mail.com' || data.password !== '123456') {
      alert('Correo o password incorrectos');
    } else {
      this._authUser$.next(this.MOCK_AUTH_USER);
      localStorage.setItem(
        'accessToken',
        uuidv4()
      );
      this.router.navigate(['dashboard', 'welcome']);
    }
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this._authUser$.next(this.MOCK_AUTH_USER);
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
