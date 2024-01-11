import { Component, NgModule, OnInit,  OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { cartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/CartItem';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppRoutes } from '../../core/config/app-routes.config';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ca } from 'date-fns/locale';


@Component({
  selector: 'app-warenkorb',
  templateUrl: './warenkorb.component.html',
  styleUrl: './warenkorb.component.scss'
})

export class WarenkorbComponent implements OnInit, OnDestroy{
  appRoutes = AppRoutes;
  cartTotal: number = 0;
  versandTotal: number = 0;
  versandAndCartTotal: number = 0;
  cartItems: CartItem[] = [];

  cartTotalAfter: number = 0;
  versandTotalAfter: number = 0;
  versandAndCartTotalAfter: number = 0;
  cartItemsAfter: CartItem[] = [];
  counterForm: FormGroup = new FormGroup({ count: new FormControl(1, [Validators.min(1)]) });
  titel: string = "Ihr Warenkorb";
  endOfBuy: boolean = false;
  devlieryDate : String = '';
  progressBar = {
    warenkorb: true,
    daten: false,
    danke: false,
    active: 'warenkorb'
  }

  constructor(private cartService: cartService, private router: Router) {
    this.subscripeUrl();
  }
  ngOnDestroy(): void {
    this.cartService.leaveEndProcessSide();
    this.endOfBuy = false;
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
      if(!this.endOfBuy){
        console.log("cartItems set: ", cartItems);
        this.cartItems = cartItems;
        this.initializeCounterForProduct();
      }
    });
    this.cartService.endOfBuy.subscribe((endOfBuy) => {
      if(endOfBuy){
        this.endOfBuy = true; 
        this.cartTotalAfter = this.cartTotal;
        this.versandTotalAfter = this.versandTotal;
        this.versandAndCartTotalAfter = this.versandAndCartTotal;
        this.cartItemsAfter = this.cartItems;
          console.log("danke delete All");
          this.cartService.deleteAllFromCart();
      }
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
        console.log("danke");
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

  getItems(): CartItem[] {
    console.log("card Items is called: " , this.endOfBuy, this.cartItemsAfter); 
    return this.endOfBuy ? this.cartItemsAfter : this.cartItems;
  }

  dateConverter(date: Date): string {
    return "Ursprung " + date.getFullYear();
  }

  anzeigeNavigateTo(route: string): void{
    console.log('/'+ this.appRoutes.WARENKORB + '/',route);
    this.router.navigate(['/'+ this.appRoutes.WARENKORB + '/',route]);
  }
}
