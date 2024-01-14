import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-element-carousel',
  templateUrl: './hero-element-carousel.component.html',
  styleUrl: './hero-element-carousel.component.scss'
})
export class HeroElementCarouselComponent implements OnInit {

  @Input() slides: any[] = [];
  @Input() showTitel: boolean = false;
  @Input() showText: boolean = false;
  currentIndex: number = 0;

  ngOnInit(): void {
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.slides.length - 1
      : this.currentIndex - 1;

    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;

    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl() {
    return this.slides[this.currentIndex].url;
  }

  getCurrentSlideAlt(){
    return this.slides[this.currentIndex].alt ? this.slides[this.currentIndex].alt : 'Slider Bild';
  }

  getCurrentTitel() {
    return this.slides[this.currentIndex].titel;
  }

  getCurrentText() {
    return this.slides[this.currentIndex].text;
  }

}
