
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*Angular Components */
import { AccordionModule } from 'primeng/accordion';
import { ReactiveFormsModule } from '@angular/forms';
import { HauptmenueComponent } from './modules/hauptmenue/hauptmenue.component';
import { ProductViewComponent } from './modules/product-view/product-view.component';
import { WeinDetailseiteComponent } from './modules/wein-detailseite/wein-detailseite.component';
import { HeroElementCarouselComponent } from './shared/hero-element-carousel/hero-element-carousel.component';
import { CardComponent } from './shared/card/card.component';
import { LightBoxComponent } from './shared/light-box/light-box.component';
import { BewertungenComponent } from './shared/bewertungen/bewertungen.component';
import { LandingpageComponent } from './modules/landingpage/landingpage.component';



@NgModule({
  declarations: [
    AppComponent,
    HauptmenueComponent,
    ProductViewComponent,
    WeinDetailseiteComponent,
    HeroElementCarouselComponent,
    CardComponent,
    LightBoxComponent,
    BewertungenComponent,
    LandingpageComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AccordionModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
