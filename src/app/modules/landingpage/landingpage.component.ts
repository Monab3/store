import { Component, OnInit} from '@angular/core';

import { AppRoutes } from '../../core/config/app-routes.config';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent implements OnInit {
  appRoutes = AppRoutes;
  weinmenueBilder = ['../../../assets/weinmenue_weisswein.jpg', '../../../assets/weinmenue_rotwein.jpg', '../../../assets/weinmenue_rosewein.jpg', '../../../assets/weinmenue_schaumwein.jpg'];
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
  constructor() { }

  ngOnInit(): void {
  }
}
