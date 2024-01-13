import { Component } from '@angular/core';
import { AppRoutes } from './core/config/app-routes.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  appRoutes = AppRoutes;
  title = 'store';
}