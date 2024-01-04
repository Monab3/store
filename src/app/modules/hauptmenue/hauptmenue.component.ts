import { Component, EventEmitter, OnInit } from '@angular/core';

import { cartService } from '../../core/services/cart.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CartItem } from '../../core/models/CartItem';

@Component({
  selector: 'app-hauptmenue',
  templateUrl: './hauptmenue.component.html',
  styleUrl: './hauptmenue.component.scss'
})
export class HauptmenueComponent implements OnInit {
  navWein: String[] = [];
  cartItems: CartItem[] = [];
  cartAnzahl: Number = 0;
  cartVisibility = false;
  cartTotal: String = "";

  number: any = 1;


  counterForm: FormGroup = new FormGroup({ count: new FormControl(1, [Validators.min(1)]) });
  hauptmenuButtonOpen: boolean = false;

  constructor(private fb: FormBuilder, private cartService: cartService
  ) {
    this.navWein = ['Weißwein', 'Rotwein', 'Roséwein', 'Sekt'];
  }

  //cartInhalt: Observable<any> = new Observable();

  ngOnInit(): void {
    this.cartService.cartInhalt.subscribe((data) => {
      this.cartItems = data;
      this.cartAnzahl = data.length;
      this.initializeCounterForProduct();
    });

    this.cartService.cartVisibility.subscribe((visibility) => {
      this.cartVisibility = visibility;
    });

    this.cartService.cartTotal.subscribe((data) => {
      this.cartTotal = data.toFixed(2);
    });

    //Formular counterForm Methoden
    this.initializeCounterForProduct();
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

  onInputChanged($event: any, i: any) {
    if($event.target.value >0){
      this.cartItems[i].produktAnzahl = $event.target.value;
      this.cartService.addToCartFromCart(this.cartItems[i]);
    }  }

    deleteItemFromCart( item: CartItem) {
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

itemPriceSum(item: CartItem) {
    return (item.wein.preis * item.produktAnzahl).toFixed(2);
  }

  togglehauptMenuButton() {
    if(this.cartVisibility){
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




