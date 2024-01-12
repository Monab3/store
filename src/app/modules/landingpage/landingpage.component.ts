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
  navWein = [
    { key: 'weisswein', value: 'Weißwein' },
    { key: 'rotwein', value: 'Rotwein' },
    { key: 'rosewein', value: 'Roséwein' },
    { key: 'schaumwein', value: 'Schaumwein' },
  ];  

  slides = [
    {
      url: '../../../assets/landingpage/landingpage-steffen-mit-wein.jpg',
      titel: 'Familienbetrieb',
      text: 'In unserem Familienbetrieb vereinen wir generationsübergreifende Erfahrung und Hingabe, um Ihnen qualitativ hochwertige Produkte und einen persönlichen Service zu bieten.'
    },
    {
      url: '../../../assets/landingpage/landingpage-weinhauschen.jpg',
      titel: 'Regionaleranbau',
      text: 'Unsere Produkte stammen aus regionalem Anbau, was nicht nur Frische garantiert, sondern auch die Unterstützung lokaler Landwirte fördert.'
    },
    {
      url: '../../../assets/landingpage/landingpage-weingut.jpg',
      titel: 'Sortimentauswahl',
      text: 'Unser vielseitiges Weinsortiment erstreckt sich von erlesenen Weiß- und Rotweinen über Sektweine bis hin zu feinen Schaumweinen.'
    },
  ]

  empfehlungDesHauses: EmpfehlungDesHauses | undefined;
  constructor(private weinService: weinService) { }

  ngOnInit(): void {
    this.initialiseData();
  }

  initialiseData(): void {
    this.empfehlungDesHauses = this.weinService.getEmpfehlungDesHauses();
  }
}
