
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../core/guards/admin.guard';
import { CoursesComponent } from './courses/courses.component';
import { InscriptionsComponent } from './inscriptions/inscriptions.component';
import { StudentsPageComponent } from './students-page/students-page.component';
import { UsersComponent } from './users/users.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  /**
   * Path actual: /dashboard
   */
  {
    path: 'welcome',
    component: WelcomePageComponent
  },
  {
    path: 'students',
    component: StudentsPageComponent,
    loadChildren: () =>
      import('./students-page/students-page.module').then((m) => m.StudentsPageModule)
  },
  {
    path: 'courses',
    component: CoursesComponent,
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'inscriptions',
    component: InscriptionsComponent,
    loadChildren: () =>
      import('./inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
  },
  {
    path: 'users',
    canActivate: [AdminGuard],
    component: UsersComponent,
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
