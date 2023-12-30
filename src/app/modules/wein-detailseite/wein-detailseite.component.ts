import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';


import { cartService } from '../../core/services/cart.service';
import { weinService } from '../../core/services/wein.service';
import { rebsortenService } from '../../core/services/rebsorten.service';
import { CartItem } from '../../core/models/CartItem';
import { Wein } from '../../core/models/Wein';
import { Rebsorte } from '../../core/models/Rebsorten';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-wein-detailseite',
  templateUrl: './wein-detailseite.component.html',
  styleUrl: './wein-detailseite.component.scss'
})
export class WeinDetailseiteComponent implements OnInit {
  wineId:number | null = null;
  toggleLightBox: Subject<boolean> = new Subject<boolean>();
  smallImageSlides: any[] = [];

  counterForm = new FormGroup({ counter: new FormControl(1, [Validators.min(1)]) });

  mockWein: Wein | undefined;;

  rebsorteInfo: Rebsorte | undefined;




  constructor(private cartService: cartService, private wineService: weinService, private rebsortenService: rebsortenService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initialiseData();
  }

  initialiseData() {
    this.route.paramMap.subscribe((params) => {
      this.wineId = parseInt(params.get('id') ?? '');
    });
    if (this.wineId != null) {
      this.mockWein = this.wineService.getWineById(this.wineId);
    }
    if (this.mockWein) {
      this.rebsorteInfo = this.rebsortenService.getRebsorte(this.mockWein.rebsorte);
      this.smallImageSlides.push({url: this.mockWein.weinBildString}, { url: this.mockWein.weinEttiketBildString },);
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
    if (this.mockWein) {
      slides.push({ url: this.mockWein.weinBildString });
      slides.push({ url: this.mockWein.weinEttiketBildString });
    }

    return slides;
  }



  showLightBox(){
   this.toggleLightBox.next(true); 
  }

}
