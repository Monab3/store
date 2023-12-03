import { Component, EventEmitter, OnInit } from '@angular/core';

import { cartService } from '../../shared/services/cart.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CartItem } from '../../shared/models/CartItem';

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

  constructor(private fb: FormBuilder, private cartService: cartService
  ) {
    this.navWein = ['Weißwein', 'Rotwein', 'Roséwein', 'Sekt'];
  }

  //cartInhalt: Observable<any> = new Observable();

  ngOnInit(): void {

    //cart Service Methoden
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
  weinmenueBilder = ['../../assets/weinmenue_weisswein.jpg', '../../assets/weinmenue_rotwein.jpg', '../../assets/weinmenue_rosewein.jpg', '../../assets/weinmenue_schaumwein.jpg'];


  public togglecart(): void {
    this.cartVisibility = !this.cartVisibility;
  }

  addQuantity(i: number, event: any) {

    console.log(`Quantity changed for index ${i}: ${event}`);
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
  



  onSubmit() {
    // Trigger form validation
    if (this.counterForm.valid) {
      // Your form is valid, perform the submission logic here
      console.log('Form submitted with value:', this.counterForm.value);
    } else {
      // Mark all form controls as touched to trigger validation messages
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

}




