import { Component, HostListener } from '@angular/core';
import { AppRoutes } from './core/config/app-routes.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  appRoutes = AppRoutes;
  title = 'store';
  hauptmenuVisible: boolean = true;
  private previousScroll = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const currentScroll = window.scrollY;

    if (currentScroll <= 0) {
      this.hauptmenuVisible = true; // At the top of the page
    } else if (currentScroll < this.previousScroll) {
      this.hauptmenuVisible = true; // Scrolling up
    } else {
      this.hauptmenuVisible = false; // Scrolling down
    }

    this.previousScroll = currentScroll;
  }

}