import { Component, NgModule, OnInit } from '@angular/core';
import { cartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/CartItem';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppRoutes } from '../../core/config/app-routes.config';
import { ActivatedRoute } from '@angular/router';


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
  counterForm: FormGroup = new FormGroup({ count: new FormControl(1, [Validators.min(1)])});

  constructor(private cartService: cartService, private route: ActivatedRoute) { 
    this.route.url.subscribe(segments => {
      console.log('Segments:', segments);
      const isKontaktformular = segments.some(segment => segment.path === 'kontaktformular');
      console.log('Is Kontaktformular:', isKontaktformular);
    });
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

  onInputChanged($event: any, i: any) {
    if ($event.target.value > 0) {
      this.cartItems[i].produktAnzahl = $event.target.value;
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
}
