import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LoginData } from '../../featured/auth/store/auth.model';
import { IUser, IUserCreatePayload } from '../../featured/dashboard/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuariosService {

  private urlAPI=environment.baseAPIURL;

  constructor(private http: HttpClient) {
    
  }
    obtenerListadoUsuarios(): Observable<IUser[]>{
      return this.http.get<IUser[]>(this.urlAPI+"/users").pipe(delay(500));
    }

    obtenerUsuarioPorID(id: string): Observable<IUser>{
      return this.http.get<IUser>(this.urlAPI+"/users/"+id).pipe();
    }

    validarUsuario(loginData: LoginData): Observable<IUser>{
      return this.http.get<IUser[]>(this.urlAPI+"/users/?email="+loginData.email+"&password="+loginData.password).pipe(
        map((users) => users[0]),
      );
    }

    agregarUsuario(payload: IUserCreatePayload): Observable<IUser>{
      return this.http.post<IUser>(this.urlAPI+"/users/",
      payload);
    }

    modificarUsuario(usuario: IUser): Observable<IUser>{
      return this.http.put<IUser>(this.urlAPI+"/users/"+usuario.id, usuario);
    }

    eliminarUsuario(id_eliminar: string): Observable<IUser>{
      return this.http.delete<IUser>(this.urlAPI+"/users/"+id_eliminar);
    }
}
