import { Component, Input, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppRoutes } from '../../core/config/app-routes.config';
import { cartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/CartItem';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-hauptmenue',
  templateUrl: './hauptmenue.component.html',
  styleUrl: './hauptmenue.component.scss'
})
export class HauptmenueComponent implements OnInit {

  @Input() isVisible: boolean = true;
  appRoutes = AppRoutes;

  navWein = [
    { key: 'weisswein', value: 'Weißwein' },
    { key: 'rotwein', value: 'Rotwein' },
    { key: 'rosewein', value: 'Roséwein' },
    { key: 'schaumwein', value: 'Schaumwein' },
  ];

  cartItems: CartItem[] = [];
  cartTotalProduktAnzahl: number = 0;
  cartAnzahl: number = 0;
  cartTotal: number = 0;
  versandTotal: number = 0;

  hauptmenuButtonOpen: boolean = false;
  websitemenuButtonOpen: boolean = false;

  hauptmenuVisible: boolean = true;
  private previousScroll = 0;

  cartVisibility = false;
  kategorie = "";
  counterForm: FormGroup = new FormGroup({ count: new FormControl(1, [Validators.min(1)]) });

  constructor(private fb: FormBuilder, private cartService: cartService, private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeData();
    this.subscribeUrl();
  }

  initializeData() {
    this.cartService.cartInhalt.subscribe((data) => {
      this.cartItems = data;
      this.cartAnzahl = data.length;
      this.initializeCounterForProduct();
    });

    this.cartService.cartVisibility.subscribe((visibility) => {
      this.cartVisibility = visibility;
    });

    this.cartService.cartTotal.subscribe((data) => {
      this.cartTotal = data;
    });
    this.cartService.cartTotalProduktAnzahl.subscribe((data) => {
      this.cartTotalProduktAnzahl = data;
    });

    this.cartService.versandTotal.subscribe((data) => {
      this.versandTotal = data;
    });
  }

  /**
  * Initialisiert Formularelemente für die Steuerung der Anzahl von Produkten im Warenkorb-PopUp.
  * Durchläuft jeden Artikel im Warenkorb-PopUp und erstellt oder aktualisiert ein Formularelement für die Produktanzahl.
  * Falls das Produkt neu zum Warenkorb hinzugefügt wurde, wird ein neues Formularelemente erstellt und mit der aktuellen Anzahl initialisiert.
  * Falls sich das Produkt bereits im Warenkorb befindet, wird die neue Anzahl des Produkts im Warenkorb-PopUp gesetzt.
  */
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
  * Abonniert die Router-Ereignisse, um Änderungen in der URL zu überwachen um im HTML Template den markierten Menüpunkt der Navigationsleiste zu aktualisieren.
  * Die Methode extrahiert die vollständige URL und vergleicht sie mit den definierten Navigationswein-Kategorien.
  * Wenn eine Übereinstimmung gefunden wird, wird die aktive Kategorie entsprechend aktualisiert.
  */
  subscribeUrl() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const fullUrl = this.router.url;
      const foundKategorie = this.navWein.find(item => fullUrl.includes(item.key));

      if (foundKategorie) {
        this.kategorie = foundKategorie.key;
      }
    })
  }

  /**
 * Navigiert zu einer bestimmten Kategorie im Weinshop. Wenn der Shop in der mobilen Ansicht ausgeführt wird, wird das Drop-Down Menü geschlossen.
 *
 * @param kategorie - Die zu navigierende Kategorie.
 * @param isMobile - Gibt an, ob die Anwendung in der mobilen Ansicht ausgeführt wird.
 * @param routerLink - Der Router-Link für die Navigation.
 */
  handleNav(kategorie: string, isMobile: boolean, routerLink: string) {
    this.router.navigate([this.appRoutes.WEINSHOP, routerLink]);
    if (isMobile) {
      this.togglehauptMenuButton();
    }
  }

  /**
  * Navigiert zum Warenkorb oder zum Kontaktformular des Warenkorbs, abhängig von der gegebenen Bedingung.
  *
  * @param navigateToWarenkorb - Gibt an, ob zum Warenkorb (true) oder zum Kontaktformular des Warenkorbs (false) navigiert werden soll.
  */
  handleNavWarenkorb(navigateToWarenkorb: boolean) {
    if (navigateToWarenkorb) {
      this.router.navigate([this.appRoutes.WARENKORB]);
    } else {
      this.router.navigate([this.appRoutes.WARENKORB, this.appRoutes.WARENKORB__KONTAKTFORMULAR]);
    }
    this.togglecart();
  }

/**
 * Wird aufgerufen, wenn die Anzahl der Weine im Warenkorb über das Warenkorb PopUp geändert wird.
 * 
 * @param $event - Das Event-Objekt, das die Änderung auslöst.
 * @param i - Der Index des aktuellen Eingabefelds im Warenkorb.
 */
  onInputChanged($event: any, i: any) {
    const inputValue = $event.target.value;
    const numericValue = parseInt(inputValue, 10);

    if (!isNaN(numericValue) && numericValue > 0) {
      this.cartItems[i].produktAnzahl = numericValue;
      this.cartService.addToCartFromCart(this.cartItems[i]);
    }
  }

  deleteItemFromCart(item: CartItem) {
    this.cartService.deleteFromCart(item);
  }

  itemPriceSum(item: CartItem) {
    return (item.wein.preis * item.produktAnzahl).toFixed(2);
  }

  cartTotalPriceSum() {
    return (this.cartTotal + this.versandTotal).toFixed(2);
  }

  togglehauptMenuButton() {
    if (this.cartVisibility) {
      this.cartVisibility = false;
    }
    if (this.websitemenuButtonOpen) {
      this.websitemenuButtonOpen = false;
    }
    this.hauptmenuButtonOpen = !this.hauptmenuButtonOpen;
  }

  /**
 * Diese Methode wird aufgerufen, um den Warenkorb ein- oder auszublenden.
 * Wenn das Hauptmenü geöffnet ist, wird es zuerst geschlossen, und dann wird die Sichtbarkeit des Warenkorbs umgekehrt.
 */
  togglecart(): void {
    if (this.hauptmenuButtonOpen)
      this.hauptmenuButtonOpen = false;
    this.cartVisibility = !this.cartVisibility;
  }

  /**
  * HostListener-Methode, die auf das Scroll-Ereignis des Fensters reagiert.
  * Passt die Sichtbarkeit des Menüs der Webseite des Weingutes basierend auf dem Scrollverhalten an.
  * Wenn der aktuelle Bildlauf an der oberen Position ist, wird das Menü sichtbar gemacht, sonst unsichtbar.
  * @param event - Das ausgelöste Scroll-Ereignis
  */
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const currentScroll = window.scrollY;
    if (currentScroll <= 0) {
      this.hauptmenuVisible = true;
    } else {
      this.hauptmenuVisible = false;
    }
    this.previousScroll = currentScroll;
  }
}




