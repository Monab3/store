import { Component } from '@angular/core';
import { AppRoutes } from '../../../../core/config/app-routes.config';

@Component({
  selector: 'app-start-bestellprozess',
  templateUrl: './start-bestellprozess.component.html',
  styleUrl: './start-bestellprozess.component.scss'
})
export class StartBestellprozessComponent {
  appRoutes = AppRoutes;
}
