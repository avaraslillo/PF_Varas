import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CoursesModule } from './courses/courses.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InscriptionsModule } from './inscriptions/inscriptions.module';
import { StudentsPageModule } from './students-page/students-page.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { UsersModule } from './users/users.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    StudentsPageModule,
    UsersModule,
    CoursesModule,
    InscriptionsModule,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavModule,
    MatListModule,
    DashboardRoutingModule,
    
  ],
  providers: [
    provideAnimationsAsync('noop')
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule {


}
