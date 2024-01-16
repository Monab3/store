import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './modules/landingpage/landingpage.component';
import { WeinDetailseiteComponent } from './modules/wein-detailseite/wein-detailseite.component';
import { AppRoutes } from './core/config/app-routes.config';
import { WarenkorbComponent } from './modules/warenkorb/warenkorb.component';
import { KontaktformularComponent } from './modules/warenkorb/children/kontaktformular/kontaktformular.component';
import { KatalogseiteComponent } from './modules/katalogseite/katalogseite.component';
import { DankeComponent } from './modules/warenkorb/children/danke/danke.component';

const routes: Routes = [
  { path: '',  component: LandingpageComponent, data: { breadcrumb: 'Home / Weinshop' }},
  { path: AppRoutes.WEINSHOP + '/:kategorie', component: KatalogseiteComponent, data: { breadcrumb: 'Galerie' } },
  { path:  AppRoutes.DETAIL, component: WeinDetailseiteComponent , data: { breadcrumb: '/ Weinansicht' }},
  { path: AppRoutes.WARENKORB, 
    component: WarenkorbComponent, data: { breadcrumb: 'Warenkorb' },
    children: [
      { path: AppRoutes.WARENKORB__KONTAKTFORMULAR, component: KontaktformularComponent, data: { breadcrumb: 'Kontaktformular' }},
      {path: AppRoutes.WARENKORB__DANKE, component: DankeComponent, data: { breadcrumb: 'Danke' },}
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
