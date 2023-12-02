import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wein } from '../models/Wein';
import { CartItem } from '../models/CartItem';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: "root" })
export class cartService {
    private cartInhaltSource = new BehaviorSubject<CartItem[]>([]);
    private cartTotalSource = new BehaviorSubject<number>(0);
    private cartVisibilitySource = new BehaviorSubject<boolean>(false);
    cartInhalt = this.cartInhaltSource.asObservable();
    cartTotal = this.cartTotalSource.asObservable();
    cartVisibility = this.cartVisibilitySource.asObservable();
    private cartVisibilityVariable = false; 
    constructor(private http: HttpClient) {
    }
    // Function to add a new item to the cart
    addTocart(newItem: CartItem) {
        const currentcart = this.cartInhaltSource.getValue();

        const existingItemIndex = currentcart.findIndex(item => item.wein._id === newItem.wein._id);
        if (existingItemIndex !== -1) {
            currentcart[existingItemIndex].produktAnzahl += newItem.produktAnzahl;
            this.cartInhaltSource.next(currentcart);
            console.log("[cartService] Item quantity stayed the same: "+ JSON.stringify(currentcart));
        } else {
            const updatedcart = [...currentcart, newItem];
            console.log("[cartService] Item quantity increased: "+ JSON.stringify(updatedcart));
            this.cartInhaltSource.next(updatedcart);
        }
        this.calculateTotal();
    }

    calculateTotal() {
        const currentCart = this.cartInhaltSource.getValue();
        const total = currentCart.reduce((sum, item) => sum + (item.wein.preis* item.produktAnzahl), 0);
        this.cartTotalSource.next(total);
    }

    togglecartVisibility(): void {
        this.cartVisibilityVariable = !this.cartVisibilityVariable ;
        this.cartVisibilitySource.next(this.cartVisibilityVariable );
      }
      setcartVisibilityTrue(): void {
        this.cartVisibilityVariable = true;
        this.cartVisibilitySource.next(this.cartVisibilityVariable );
      }
}