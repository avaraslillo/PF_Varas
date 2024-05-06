import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ServicioAuthService } from '../../core/services/servicio-auth.service';
import { IStudent } from './models/student.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isDrawerOpen: boolean = true;

  authUser$: Observable<IStudent | null>;

  authUserSinPipe: IStudent | null = null;
  authUserSubscription?: Subscription;

  constructor(private authService: ServicioAuthService, private router: Router) {
    this.authUser$ = this.authService.authUser$;
  }

  ngOnDestroy(): void {
    this.authUserSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.authUserSubscription = this.authService.authUser$.subscribe({
      next: (user) => {
        this.authUserSinPipe = user;
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth']);
  }


  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}

