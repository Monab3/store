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

  @Input() kategorie: string | undefined;
  @Input() wein: Wein | undefined;
  @Input() cardDetail: boolean = false;
  @Input() cardProduktView: boolean = false;
  @Input() productViewList: boolean = false;
  @Output() showBewertungenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    appRoutes = AppRoutes;

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

    if (this.wein) {
      const newProduct: CartItem = {
        wein: this.wein,
        produktAnzahl: quantity || 1
      };
      this.cartService.addToCart(newProduct);
      this.cartService.setcartVisibilityTrue();
    }
  }

  scrollToEnd(): void {
    this.showBewertungenChange.emit(true);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  getStarsArray(): number[] {
    return new Array(5 - this.bewertungWrapper.averageRating);
  }

  getFullStarsArray(): number[] {
    return new Array(this.bewertungWrapper.averageRating);
  }

  dateConverter(date: Date): string {
    return "Ursprung " + date.getFullYear();
  }
}

