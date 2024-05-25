import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { ServicioUsuariosService } from '../../../core/services/servicio-usuarios.service';
import { IUser } from '../models/user.model';
import { UsersDialogComponent } from '../users-dialog/users-dialog.component';
import { UserActions } from './store/user.actions';
import { UserState } from './store/user.reducer';
import { selectIsLoading, selectUserError, selectUsers } from './store/user.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  displayedColumns: string[] = ['email', 'contrasenia','nombre','direccion','telefono','perfil','acciones'];


  

  /*@ViewChild(UserDialogComponent)
  UserDialogComponent: UserDialogComponent = new UserDialogComponent;*/
  listadoUsuarios: IUser[] = [];
  dataSource: MatTableDataSource<IUser>=new MatTableDataSource<IUser>(this.listadoUsuarios);
  //subscriptionObservable?: Observable<IUser>;
  observableUsuarios:Observable<IUser[]>=EMPTY;
  private subscriptionObservable: Subscription = new Subscription();
  isLoading$: Observable<boolean>;
  error$: Observable<any>;
  constructor(private store: Store<{ userState: UserState }>,
              public userDialog: MatDialog, 
              private servicioUsuarios: ServicioUsuariosService) {
                this.isLoading$ = this.store.pipe(select(selectIsLoading));
                this.observableUsuarios = this.store.pipe(select(selectUsers));
                this.error$ = this.store.pipe(select(selectUserError));
  }

  ngOnInit(): void {
    this.actualizarListadoUsuarios();
  }

  ngOnDestroy(): void {
    if (this.subscriptionObservable) {
      this.subscriptionObservable.unsubscribe();
    }
  }

  actualizarListadoUsuarios(){
    this.store.dispatch(UserActions.loadUsers());
  }

  abrirFormulario(usuarioAEditar?: IUser ) {
    const dialogRef = this.userDialog
                          .open(UsersDialogComponent,{data:usuarioAEditar})
                          .afterClosed()
                          .subscribe({
                            next:(result)=>{
                              if(result){
                                result.date=new Date();
                                if(usuarioAEditar){
                                  result.id=usuarioAEditar.id;
                                    this.store.dispatch(UserActions.updateUser({user: result}));
                                }
                                else{
                                
                                    this.store.dispatch(UserActions.createUser({payload: result}));
                                }
                              }
                            },
                            error:(err)=>{
                              console.log(err);
                            }
                          });
  }


  onDeleteUser(id_eliminar: string){
    if(confirm('¿Está seguro de eliminar al usuario seleccionado?')){
      this.store.dispatch(UserActions.deleteUser({id:id_eliminar}));
    }
    
  }
}
function subscribe(arg0: { next: (result: IUser[]) => void; error: (err: any) => void; complete: () => void; }) {
  throw new Error('Function not implemented.');
}