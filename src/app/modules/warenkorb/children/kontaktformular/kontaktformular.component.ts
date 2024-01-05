import { Component } from '@angular/core';
import { AppRoutes } from '../../../../core/config/app-routes.config';

@Component({
  selector: 'app-kontaktformular',
  templateUrl: './kontaktformular.component.html',
  styleUrl: './kontaktformular.component.scss'
})
export class KontaktformularComponent {
  appRoutes = AppRoutes;
}
