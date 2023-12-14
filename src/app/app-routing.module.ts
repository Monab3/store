import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './product-view/product-view.component';
import { WeinDetailseiteComponent } from './wein-detailseite/wein-detailseite.component';
import { TestofresponsiveComponent } from './testofresponsive/testofresponsive.component';

const routes: Routes = [
  { path: '', component: ProductViewComponent },
  { path: 'wein-detail', component: WeinDetailseiteComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
