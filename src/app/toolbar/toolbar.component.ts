import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Output() toggleDrawer: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  toggleDrawerClick() {
    console.log("Abrir toggle");
    this.toggleDrawer.emit();
  }
}
