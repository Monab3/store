import { Component, OnInit} from '@angular/core';
import { EmpfehlungDesHauses } from '../../core/models/Wein';
import { AppRoutes } from '../../core/config/app-routes.config';
import { weinService } from '../../core/services/wein.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent implements OnInit {
  appRoutes = AppRoutes;
  weinmenueBilder = ['../../../assets/landingpage/weinmenue_weisswein.jpg', '../../../assets/landingpage/weinmenue_rotwein.jpg', '../../../assets/landingpage/weinmenue_rosewein.jpg', '../../../assets/landingpage/weinmenue_schaumwein.jpg'];
  weinmenueBildAlt = ['Navigation zu den Weißweinen', 'Navigation zu den Rotweinen', 'Navigation zu den Roséweinen', 'Navigation zu den Schaumweinen'];

  navWein = [
    { key: 'weisswein', value: 'Weißwein' },
    { key: 'rotwein', value: 'Rotwein' },
    { key: 'rosewein', value: 'Roséwein' },
    { key: 'schaumwein', value: 'Schaumwein' },
  ]; 

  empfehlungDesHauses: EmpfehlungDesHauses | undefined;
  constructor(private weinService: weinService) { }

  ngOnInit(): void {
    this.initialiseData();
  }

  initialiseData(): void {
    this.empfehlungDesHauses = this.weinService.getEmpfehlungDesHauses();
  }
}
