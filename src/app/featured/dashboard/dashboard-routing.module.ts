
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { InscriptionsComponent } from '../inscriptions/inscriptions.component';
import { StudentsPageComponent } from '../students-page/students-page.component';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';

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
      import('../../featured/students-page/students-page.module').then((m) => m.StudentsPageModule)
  },
  {
    path: 'courses',
    component: CoursesComponent,
    loadChildren: () =>
      import('../../featured/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'inscriptions',
    component: InscriptionsComponent,
    loadChildren: () =>
      import('../../featured/inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
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
