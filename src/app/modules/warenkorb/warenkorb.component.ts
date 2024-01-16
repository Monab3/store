import { Component, OnInit } from '@angular/core';
import { cartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/CartItem';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppRoutes } from '../../core/config/app-routes.config';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-warenkorb',
  templateUrl: './warenkorb.component.html',
  styleUrl: './warenkorb.component.scss'
})

export class WarenkorbComponent implements OnInit {
  appRoutes = AppRoutes;
  counterForm: FormGroup = new FormGroup({ count: new FormControl(1, [Validators.min(1)]) });

  cartTotal: number = 0;
  versandTotal: number = 0;
  versandAndCartTotal: number = 0;
  cartItems: CartItem[] = [];

  titel: string = "Ihr Warenkorb";
  devlieryDate: String = '';

  progressBar = {
    warenkorb: true,
    daten: false,
    danke: false,
    active: 'warenkorb'
  }

  constructor(private cartService: cartService, private router: Router) {
    this.subscripeUrl();
  }

  ngOnInit(): void {
    this.initializeData();
  }


  initializeData() {
    this.cartService.cartTotal.subscribe((total) => {
      this.cartTotal = total;
    });
    this.cartService.versandTotal.subscribe((total) => {
      this.versandTotal = total;
      this.versandAndCartTotal = this.cartTotal + this.versandTotal;
    });
    this.cartService.cartInhalt.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.initializeCounterForProduct();
    });
    this.devlieryDate = this.cartService.getDeliveryDate();
  }

  initializeCounterForProduct() {
    this.cartItems.forEach((item, index) => {
      const formControlName = `count${item.wein._id}`;
      if (!this.counterForm?.get(formControlName)) {
        this.counterForm?.addControl(formControlName, new FormControl(item.produktAnzahl, [Validators.min(1)]));
      } else {
        this.counterForm?.get(formControlName)?.setValue(item.produktAnzahl);
      }
    });
  }

  /**
  * Diese Methode abonniert die Ereignisse des Router-Moduls, insbesondere den
  * NavigationEnd-Event, um auf Änderungen der URL zu reagieren. Basierend auf
  * der aktuellen URL werden der Titel und der Status der Fortschrittsleiste
  * aktualisiert.
  */
  subscripeUrl() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const fullUrl = this.router.url;
      if (fullUrl.includes(this.appRoutes.WARENKORB__KONTAKTFORMULAR)) {
        this.titel = "Ihre Kontaktdaten";
        this.progressBar = {
          warenkorb: true,
          daten: true,
          danke: false,
          active: 'daten'
        }

      } else if (fullUrl.includes(this.appRoutes.WARENKORB__DANKE)) {
        this.titel = "Vielen Dank";
        this.progressBar = {
          warenkorb: false,
          daten: false,
          danke: true,
          active: 'danke'
        }
      } else {
        this.titel = "Ihr Warenkorb";
        this.progressBar = {
          warenkorb: true,
          daten: false,
          danke: false,
          active: 'warenkorb'
        }
      }
    }
    );
  }

  /**
  * Diese Methode wird aufgerufen, wenn sich der Wert in einem Eingabefeld ändert,
  * das die Anzahl der Produkte im Warenkorb steuert. Sie überprüft den eingegebenen
  * Wert, aktualisiert die Produktanzahl im Warenkorb und aktualisiert dann den
  * Warenkorb über den CartService.
  * 
 * @param $event Das Ereignisobjekt, das den Eingabewert enthält.
 * @param i Der Index des betroffenen Produkts im Warenkorb.
  */

  onInputChanged($event: any, i: any) {
    const inputValue = $event.target.value;
    const numericValue = parseInt(inputValue, 10); // or Number(inputValue);

    if (!isNaN(numericValue) && numericValue > 0) {
      this.cartItems[i].produktAnzahl = numericValue;
      this.cartService.addToCartFromCart(this.cartItems[i]);
    }
  }

  deleteItemFromCart(item: CartItem) {
    this.cartService.deleteFromCart(item);
  }

  getItems(): CartItem[] {
    return this.cartItems;
  }

  dateConverter(date: Date): string {
    return "Ursprung " + date.getFullYear();
  }

  anzeigeNavigateTo(route: string): void {
    this.router.navigate(['/' + this.appRoutes.WARENKORB + '/', route]);
  }
}
