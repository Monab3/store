import { Component, OnInit } from '@angular/core';
import { cartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/CartItem';

@Component({
  selector: 'app-warenkorb',
  templateUrl: './warenkorb.component.html',
  styleUrl: './warenkorb.component.scss'
})
export class WarenkorbComponent implements OnInit {

  cartTotal: number = 0;
  versandTotal: number = 0;
  versandAndCartTotal: number = 0;
  cartItems: CartItem[] = [];
  constructor(private cartService: cartService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    this.cartService.cartTotal.subscribe((total) => {
      this.cartTotal = total;
    });
    this.cartService.versandTotal.subscribe((total) => {
      console.log("Versandtotal in warenkorb klass: "+ total);
      this.versandTotal = total;
      this.versandAndCartTotal = this.cartTotal + this.versandTotal;
    });
    this.cartService.cartInhalt.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }
  
  dateConverter(date: Date): string {
    return "Ursprung " + date.getFullYear();
  }
}
