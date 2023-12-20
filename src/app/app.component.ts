import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { concat, filter, first, interval } from 'rxjs';
import { FakeShopService } from './services/fake-shop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pwa-angular';
  products: any[] = [];
  items: MenuItem[];

  constructor(
    private update: SwUpdate,
    private appRef: ApplicationRef,
    private confirmationService: ConfirmationService,
    private fakeShopService: FakeShopService
  ) {
    this.updateClient();
    this.checkUpdate();
    this.fakeShopService.getProducts().subscribe((res: any) => {
      this.products = res;
      console.log(res);
    });
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

  updateClient() {
    /* this.update.versionUpdates.subscribe((evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(
            `New app version ready for use: ${evt.latestVersion.hash}`
          );
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(
            `Failed to install app version '${evt.version.hash}': ${evt.error}`
          );
          break;
      }
    }); */

    this.update.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      )
      .subscribe((evt) => {
        this.confirmationService.confirm({
          message: 'Update is available for the app please confirm',
          header: 'New Upload',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            document.location.reload();
          },
          reject: () => {},
        });
        /* if (confirm('Update is available for the app please confirm')) {
         
          document.location.reload();
        } */
      });
  }

  checkUpdate() {
    const appIsStable$ = this.appRef.isStable.pipe(
      first((isStable) => isStable === true)
    );
    const everySixHours$ = interval(15 * 1000); // Cada 15 seg
    /* const everySixHours$ = interval(6 * 60 * 60 * 1000); */
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await this.update.checkForUpdate();
        console.log(
          updateFound
            ? 'A new version is available.'
            : 'Already on the latest version.'
        );
        if (updateFound) {
          this.updateClient();
        }
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });
  }
}
