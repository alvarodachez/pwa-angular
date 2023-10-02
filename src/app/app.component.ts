import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pwa-angular';

  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: ['/home'],
      },
      {
        label: 'Productos',
        icon: 'pi pi-list',
        routerLink: ['/products'],
      },
      {
        label: 'Servicios',
        icon: 'pi pi-cog',
        routerLink: ['/services'],
      },
      {
        label: 'Contacto',
        icon: 'pi pi-envelope',
        routerLink: ['/contact'],
      },
    ];
  }
}
