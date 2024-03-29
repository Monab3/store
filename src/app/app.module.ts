
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

/*Angular Components */
import { AccordionModule } from 'primeng/accordion';
import { ReactiveFormsModule } from '@angular/forms';
import { HauptmenueComponent } from './modules/hauptmenue/hauptmenue.component';
import { WeinDetailseiteComponent } from './modules/wein-detailseite/wein-detailseite.component';
import { HeroElementCarouselComponent } from './shared/hero-element-carousel/hero-element-carousel.component';
import { CardComponent } from './shared/card/card.component';
import { BewertungenComponent } from './shared/bewertungen/bewertungen.component';
import { LandingpageComponent } from './modules/landingpage/landingpage.component';
import { FooterComponent } from './modules/footer/footer.component';
import { WarenkorbComponent } from './modules/warenkorb/warenkorb.component';
import { KatalogseiteComponent } from './modules/katalogseite/katalogseite.component';
import { KontaktformularComponent } from './modules/warenkorb/children/kontaktformular/kontaktformular.component';
import { DankeComponent } from './modules/warenkorb/children/danke/danke.component';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [
    AppComponent,
    HauptmenueComponent,
    WeinDetailseiteComponent,
    HeroElementCarouselComponent,
    CardComponent,
    BewertungenComponent,
    LandingpageComponent,
    FooterComponent,
    WarenkorbComponent,
    KatalogseiteComponent,
    KontaktformularComponent,
    DankeComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
