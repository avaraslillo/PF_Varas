import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthActions } from '../auth/store/auth.actions';
import { AuthState } from '../auth/store/auth.reducer';
import { selectAuthError, selectIsLoading, selectUser } from '../auth/store/auth.selector';
import { IUser } from './models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isDrawerOpen: boolean = true;

  authUser$: Observable<IUser | null>;

  authUserSinPipe: IUser | null = null;
  authUserSubscription?: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store<{ authState: AuthState }>, 
              private router: Router) {
    this.authUser$ = this.store.pipe(select(selectUser));
    this.isLoading$ = this.store.pipe(select(selectIsLoading))
    this.error$ = this.store.pipe(select(selectAuthError));
  }

  ngOnDestroy(): void {
    //this.authUserSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    //this.authUserSubscription = this.s
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['auth']);
  }


  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}

