import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cartService } from '../../core/services/cart.service';
import { bewertungService } from '../../core/services/bewertung.service';
import { CartItem } from '../../core/models/CartItem';
import { Wein } from '../../core/models/Wein';
import { AppRoutes } from '../../core/config/app-routes.config';
import { BewertungWrapper } from '../../core/models/Bewertung';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  appRoutes = AppRoutes;

  @Input() kategorie: string | undefined;
  @Input() wein: Wein | undefined;
  @Input() cardDetail: boolean = false;
  @Input() cardProduktView: boolean = false;
  @Input() productViewList: boolean = false;

  @Output() showBewertungenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  counterForm = new FormGroup({ counter: new FormControl(1, [Validators.min(1)]) });
  bewertungWrapper: BewertungWrapper = {
    averageRating: 0,
    bewertungen: []
  };

  bewertungWrapper$: Observable<BewertungWrapper> = new Observable<BewertungWrapper>();
  url: string = "../../assets/image 143.png";

  ngOnInit(): void {
    this.initialiseData();
  }

  initialiseData(): void {
    if (this.wein != null) {
      this.bewertungWrapper$ = this.bewertungService.getBewertungWrapperForWine(this.wein._id);
    }
    this.bewertungWrapper$.subscribe((wrapper: BewertungWrapper) => {
      this.bewertungWrapper.averageRating = wrapper.averageRating;
      this.bewertungWrapper.bewertungen = wrapper.bewertungen;
    });
  }


  constructor(private cartService: cartService, private bewertungService: bewertungService) { }

  /**
   * Verringert die Anzahl der Weine in einser Schritten
   */
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

  /**
   * Erhöhung der Anzahl der Weine in einser Schritten
   */
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

    if (this.wein) {
      const newProduct: CartItem = {
        wein: this.wein,
        produktAnzahl: quantity || 1
      };
      this.cartService.addToCart(newProduct);
      this.cartService.setcartVisibilityTrue();
    }
  }

  /**
  * Diese Methode wird aufgerufen, um zum Ende der Seite zu scrollen.
  */
  scrollToEnd(): void {
    this.showBewertungenChange.emit(true);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  /**
  * Diese Methode gibt ein Array zurück, das die Anzahl der leeren Sterne
  * repräsentiert, die für die durchschnittliche Bewertung fehlen. Das Array
  * wird in der Regel für die Anzeige von leeren Sternen in der Benutzeroberfläche
  * verwendet.
  *
  * @returns Ein Array mit der Anzahl der leeren Sterne.
  */
  getStarsArray(): number[] {
    return new Array(5 - this.bewertungWrapper.averageRating);
  }
  
  /**
  * Diese Methode gibt ein Array zurück, das die Anzahl der vollen Sterne
  * repräsentiert, die der durchschnittlichen Bewertung entsprechen. Das Array
  * wird in der Regel für die Anzeige von vollen Sternen in der Benutzeroberfläche
  * verwendet.
  *
  * @returns Ein Array mit der Anzahl der vollen Sterne.
  */
  getFullStarsArray(): number[] {
    return new Array(this.bewertungWrapper.averageRating);
  }

  dateConverter(date: Date): string {
    return "Ursprung " + date.getFullYear();
  }
}

