import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from '../app-routing.module';
import { StudentsPageModule } from '../students-page/students-page.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    StudentsPageModule,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    provideAnimationsAsync('noop')
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule {

  isDrawerOpen: boolean = true;

  constructor() { }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}
