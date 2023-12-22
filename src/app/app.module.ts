
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*Angular Components */
import { AccordionModule } from 'primeng/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HauptmenueComponent } from './modules/hauptmenue/hauptmenue.component';
import { ProductViewComponent } from './modules/product-view/product-view.component';
import { WeinDetailseiteComponent } from './modules/wein-detailseite/wein-detailseite.component';
import {SharedModule } from './shared/shared.module'; 


@NgModule({
  declarations: [
    AppComponent,
    HauptmenueComponent,
    ProductViewComponent,
    WeinDetailseiteComponent,
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AccordionModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
