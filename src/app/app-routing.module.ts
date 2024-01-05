import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './modules/product-view/product-view.component';
import { LandingpageComponent } from './modules/landingpage/landingpage.component';
import { WeinDetailseiteComponent } from './modules/wein-detailseite/wein-detailseite.component';
import { AppRoutes } from './core/config/app-routes.config';
import { WarenkorbComponent } from './modules/warenkorb/warenkorb.component';
import { StartBestellprozessComponent } from './modules/warenkorb/children/start-bestellprozess/start-bestellprozess.component';
import { KontaktformularComponent } from './modules/warenkorb/children/kontaktformular/kontaktformular.component';

const routes: Routes = [
  { path: '', redirectTo: AppRoutes.WARENKORB, pathMatch: 'full' },
  { path: AppRoutes.WARENKORB, 
    component: WarenkorbComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: AppRoutes.WARENKORB__BESTELLPROZESS},
      {path: AppRoutes.WARENKORB__BESTELLPROZESS, component: StartBestellprozessComponent},
      { path: AppRoutes.WARENKORB__KONTAKTFORMULAR, component: KontaktformularComponent},
    ] 
  },
  {
    path: AppRoutes.DETAIL, component: WeinDetailseiteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
