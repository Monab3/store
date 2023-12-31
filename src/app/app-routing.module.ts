import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './modules/product-view/product-view.component';
import { LandingpageComponent } from './modules/landingpage/landingpage.component';
import { WeinDetailseiteComponent } from './modules/wein-detailseite/wein-detailseite.component';
import { AppRoutes } from './core/config/app-routes.config';


const routes: Routes = [
  { path: '', redirectTo: AppRoutes.WEINSHOP, pathMatch: 'full' },
  { path: AppRoutes.WEINSHOP, component: LandingpageComponent },
  { path: AppRoutes.DETAIL, component: WeinDetailseiteComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
