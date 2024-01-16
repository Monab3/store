import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { cartService } from '../../core/services/cart.service';
import { weinService } from '../../core/services/wein.service';
import { CartItem } from '../../core/models/CartItem';
import { Wein } from '../../core/models/Wein';


@Component({
  selector: 'app-wein-detailseite',
  templateUrl: './wein-detailseite.component.html',
  styleUrl: './wein-detailseite.component.scss'
})
export class WeinDetailseiteComponent implements OnInit {
  wineId: number | null = null;
  kategorie: string | null = null;
  toggleLightBox: Subject<boolean> = new Subject<boolean>();
  smallImageSlides: any[] = [];
  produktBild: String | undefined;
  showBewertungen: boolean = false;
  showSteckbrief: boolean = true;
  counterForm = new FormGroup({ counter: new FormControl(1, [Validators.min(1)]) });
  mockWein: Wein | undefined;

  constructor(private cartService: cartService, private wineService: weinService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initialiseData();
  }

  initialiseData() {
    this.route.paramMap.subscribe((params) => {
      this.kategorie = params.get('kategorie');
      this.wineId = parseInt(params.get('id') ?? '');
    });
    if (this.wineId != null && this.kategorie != null) {
      this.mockWein = this.wineService.getWineById(this.kategorie, this.wineId);
      this.produktBild = this.mockWein?.weinBildL;
    }
    if (this.mockWein) {
      this.smallImageSlides.push({ url: this.mockWein.weinBildS }, { url: this.mockWein.weinEttiketBildS },);
    }
  }

  handleMinus() {
    const control = this.counterForm?.get('counter');
    if (control) {
      const currentValue = control.value;
      if (currentValue !== null && currentValue >= 2) {
        control.setValue(currentValue - 1);
      } else {
        control.setValue(1);
      }
    }
  }

  handlePlus() {
    const control = this.counterForm?.get('counter');
    if (control) {
      const currentValue = control.value;
      if (currentValue !== null && currentValue >= 1) {
        control.setValue(currentValue + 1);
      } else {
        control.setValue(1);
      }
    }
  }

  addProductToCart() {

    const quantity = this.counterForm?.get('counter')?.value
    if (this.mockWein) {
      const newProduct: CartItem = {
        wein: this.mockWein,
        produktAnzahl: quantity || 1
      };

      this.cartService.addToCart(newProduct);
      this.cartService.setcartVisibilityTrue();
    }

  }
  /**
     * Erstellt Slides aus den Bildern des Weins
     */

  createSlidesForCarousel() {
    const slides = [];
    if (this.mockWein && this.mockWein.weinBildS && this.mockWein.weinEttiketBildS) {
      slides.push({ url: this.mockWein.weinBildS, alt: this.mockWein.weinBildAlt });
      slides.push({ url: this.mockWein.weinEttiketBildS, alt: this.mockWein.weinEttiketBildAlt });
    }

    return slides;
  }

  switchPicture(img: String | undefined) {
    if (img) {
      this.produktBild = img;
    }
  }

  toggleSteckbrief() {
    this.showBewertungen = false;
    this.showSteckbrief = true;
  }
  handleShowBewertungenChange(value: boolean): void {
    this.toggleBewertung();
  }
  toggleBewertung() {
    this.showBewertungen = true;
    this.showSteckbrief = false;
  }
}
