import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CoursesModule } from '../courses/courses.module';
import { InscriptionsModule } from '../inscriptions/inscriptions.module';
import { StudentsPageModule } from '../students-page/students-page.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    BrowserModule,
    ToolbarModule,
    StudentsPageModule,
    CoursesModule,
    InscriptionsModule,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavModule,
    MatListModule,
    DashboardRoutingModule
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
