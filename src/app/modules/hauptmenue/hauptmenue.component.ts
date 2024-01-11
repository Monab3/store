import { Component, Input, OnInit } from '@angular/core';
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
  cartVisibility = false;
  cartTotal: number = 0;
  versandTotal: number = 0;
  hauptmenuButtonOpen: boolean = false;
  number: any = 1;
  kategorie = "";

  counterForm: FormGroup = new FormGroup({ count: new FormControl(1, [Validators.min(1)]) });
  constructor(private fb: FormBuilder, private cartService: cartService, private router: Router,
    private route: ActivatedRoute
  ) {

  }

  //cartInhalt: Observable<any> = new Observable();

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
      console.log("cartTotalProduktAnzahl: " + data);
      this.cartTotalProduktAnzahl = data;
    });

    this.cartService.versandTotal.subscribe((data) => {
      this.versandTotal = data;
    });
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

  subscribeUrl() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const fullUrl = this.router.url;
      const foundKategorie = this.navWein.find(item => fullUrl.includes(item.key));

      // Set kategorie if a match is found
      if (foundKategorie) {
        this.kategorie = foundKategorie.key;
      }
      
})}

handleNav(kategorie: string, isMobile: boolean, routerLink: string) {
  this.router.navigate([this.appRoutes.WEINSHOP, routerLink]);
  if (isMobile) {
    this.togglehauptMenuButton();
  }
}

handleNavWarenkorb(navigateToWarenkorb : boolean){
  if (navigateToWarenkorb) {
    this.router.navigate([this.appRoutes.WARENKORB]);
  } else {
    this.router.navigate([this.appRoutes.WARENKORB, this.appRoutes.WARENKORB__KONTAKTFORMULAR]);
  }
  this.togglecart();
}

navigateToWeinshop(key: string): void {
  this.router.navigate([this.appRoutes.WEINSHOP, key]);
}

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

onSubmit() {
  if (this.counterForm.valid) {
  } else {
    this.markFormGroupTouched(this.counterForm);
  }
}

  private markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control);
    }
  });
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
  this.hauptmenuButtonOpen = !this.hauptmenuButtonOpen;
}


  public togglecart(): void {
  if(this.hauptmenuButtonOpen)
  this.hauptmenuButtonOpen = false;
  this.cartVisibility = !this.cartVisibility;

}

}




