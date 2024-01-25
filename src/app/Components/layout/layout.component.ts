import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  sidebarOpen = true;

  visibleOption1 = false;
  hiddenOptionsUser = true;
  dropdown() {
    this.visibleOption1 = !this.visibleOption1;
  }
  openDropdownUser() {
    this.hiddenOptionsUser = !this.hiddenOptionsUser;
  }
}
