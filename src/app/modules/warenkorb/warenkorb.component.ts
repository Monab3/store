import { Component, NgModule, OnInit } from '@angular/core';
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
  cartTotal: number = 0;
  versandTotal: number = 0;
  versandAndCartTotal: number = 0;
  cartItems: CartItem[] = [];
  counterForm: FormGroup = new FormGroup({ count: new FormControl(1, [Validators.min(1)]) });
  titel: string = "Ihr Warenkorb";

  progressBar = {
    warenkorb: true,
    daten: false,
    danke: false,
    active: 'warenkorb'
  }

  constructor(private cartService: cartService, private router: Router,) {
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

      }  else if (fullUrl.includes(this.appRoutes.WARENKORB__DANKE)) {
        this.titel = "Vielen Dank";
        this.progressBar = {
          warenkorb: false,
          daten: false,
          danke: true,
          active: 'danke'
        }
      }else {
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
      console.log('Form submitted with value:', this.counterForm.value);
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

  dateConverter(date: Date): string {
    return "Ursprung " + date.getFullYear();
  }

  anzeigeNavigateTo(route: string): void{
    console.log('/'+ this.appRoutes.WARENKORB + '/',route);
    this.router.navigate(['/'+ this.appRoutes.WARENKORB + '/',route]);
  }
}
