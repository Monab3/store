import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    addToCart(newItem: CartItem) {
        const currentcart = this.cartInhaltSource.getValue();

        const existingItemIndex = currentcart.findIndex(item => item.wein._id === newItem.wein._id);
        if (existingItemIndex !== -1) {
            currentcart.splice(existingItemIndex, 1);
        }
        currentcart.unshift(newItem);
        this.cartInhaltSource.next(currentcart);
        this.calculateTotal();
    }

    /**
     * Wenn innerhalb des Warenkorb-PopUps ein Wein hinzugefügt wird, wird diese Funktion aufgerufen, damit der Wein im 
     * cartInhaltSource an Index 0 hinzugefügt wird, sondern an seinem vorherigen Index bleibt.
     * 
     * @param {CartItem} newItem - hinzuzufügendes CartItem-Objekt
     */

    addToCartFromCart(newItem: CartItem) {
        const currentcart = this.cartInhaltSource.getValue();

        const existingItemIndex = currentcart.findIndex(item => item.wein._id === newItem.wein._id);
        if (existingItemIndex !== -1) {
            currentcart[existingItemIndex].produktAnzahl = newItem.produktAnzahl;
            this.cartInhaltSource.next(currentcart);
            console.log("[cartService] Item quantity stayed the same: " + JSON.stringify(currentcart));
        } else {
            const updatedcart = [...currentcart, newItem];
            console.log("[cartService] Item quantity increased: " + JSON.stringify(updatedcart));
            this.cartInhaltSource.next(updatedcart);
        }
        this.calculateTotal();
    }

    togglecartVisibility(): void {
        this.cartVisibilityVariable = !this.cartVisibilityVariable;
        this.cartVisibilitySource.next(this.cartVisibilityVariable);
    }
    
    setcartVisibilityTrue(): void {
        this.cartVisibilityVariable = true;
        this.cartVisibilitySource.next(this.cartVisibilityVariable);
    }

    deleteFromCart(item: CartItem) {     
        const currentcart = this.cartInhaltSource.getValue();
        const updatedcart = currentcart.filter(cartItem => cartItem.wein._id !== item.wein._id);
        this.cartInhaltSource.next(updatedcart);
        this.calculateTotal();
    }

    //Helfer Klassen

    private calculateTotal() {
        const currentCart = this.cartInhaltSource.getValue();
        const total = currentCart.reduce((sum, item) => sum + (item.wein.preis * item.produktAnzahl), 0);
        this.cartTotalSource.next(total);
    }
}