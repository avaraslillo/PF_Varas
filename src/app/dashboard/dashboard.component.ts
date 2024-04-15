import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isDrawerOpen: boolean = true;

  constructor() { }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}

