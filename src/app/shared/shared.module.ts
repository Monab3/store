import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroElementCarouselComponent } from './components/hero-element-carousel/hero-element-carousel.component';



@NgModule({
  declarations: [
    CardComponent,
    HeroElementCarouselComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

  ],
  exports: [
    CardComponent,
    HeroElementCarouselComponent
  ]
})
export class SharedModule { }
