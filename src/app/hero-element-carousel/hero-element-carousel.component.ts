import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-element-carousel',
  templateUrl: './hero-element-carousel.component.html',
  styleUrl: './hero-element-carousel.component.scss'
})
export class HeroElementCarouselComponent implements OnInit, OnDestroy  {

  slides=[
    {url: '../../assets/grauburgunder.png', titel: 'Selbst gemacht'},
    {url: '../../assets/weinmenue_rosewein.jpg', titel: 'Neues von der Weinproduktion', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.'},
    {url: '../../assets/weinmenue_rotwein.jpg', titel: 'Hier und jetzt ', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.'},
    {url: '../../assets/weinmenue_weisswein.jpg', titel: 'neunes Ettikett', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.'},
  ]

  currentIndex: number = 0;
  timeoutId?: number;

  ngOnInit(): void {
    this.resetTimer();
  }

  ngOnDestroy() {
    window.clearTimeout(this.timeoutId);
  }

  resetTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => this.goToNext(), 3000);
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.slides.length - 1
      : this.currentIndex - 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.resetTimer();
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl() {
    return this.slides[this.currentIndex].url;
  }

  getCurrentTitel() {
    return this.slides[this.currentIndex].titel;
  }

  getCurrentText() {
    return this.slides[this.currentIndex].text;
   
  }

}
