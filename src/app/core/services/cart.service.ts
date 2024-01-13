import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/CartItem';
import { BehaviorSubject } from 'rxjs';
import { format, addDays } from 'date-fns';



@Injectable({ providedIn: "root" })
export class cartService {
    private cartInhaltSource = new BehaviorSubject<CartItem[]>([]);
    private cartTotalSource = new BehaviorSubject<number>(0);
    private cartTotalProduktAnzahlSource = new BehaviorSubject<number>(0);
    private versandTotalSource = new BehaviorSubject<number>(0);
    private cartVisibilitySource = new BehaviorSubject<boolean>(false);
    cartInhalt = this.cartInhaltSource.asObservable();
    cartTotal = this.cartTotalSource.asObservable();
    cartTotalProduktAnzahl = this.cartTotalProduktAnzahlSource.asObservable();
    versandTotal = this.versandTotalSource.asObservable();
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
            console.log("[cartService] Item quantity increased: " + JSON.stringify(currentcart[existingItemIndex].produktAnzahl));
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
        const currentCart = this.cartInhaltSource.getValue();
        const updatedcart = currentCart.filter(cartItem => cartItem.wein._id !== item.wein._id);
        this.cartInhaltSource.next(updatedcart);
        this.calculateTotal();
    }

    clearCart(){
        const currentCart = this.cartInhaltSource.getValue();
        const updatedcart : CartItem[] = [];
        this.cartInhaltSource.next(updatedcart);
        this.calculateTotal();
    }


    private calculateTotal() {
        const currentCart = this.cartInhaltSource.getValue();
        const total = currentCart.reduce((sum, item) => sum + (item.wein.preis * item.produktAnzahl), 0);
        this.cartTotalSource.next(total);
        let totalProduktAnzahl:number = currentCart.reduce((total, cartItem) => total + cartItem.produktAnzahl, 0);
        console.log("caculatetotal: "+totalProduktAnzahl ); 
        this.cartTotalProduktAnzahlSource.next(totalProduktAnzahl);
        this.calculateVersand(totalProduktAnzahl, total);
    }

    private calculateVersand(anzahlWein: number, warenwert: number): void {
        console.log("anzahlWein: " + anzahlWein);
        const preisProFlasche = 0.5;
        if (warenwert >= 350) {
            this.versandTotalSource.next(0);
            console.log("versand von 350 euro");
            return;
        }
        if (anzahlWein >= 1 && anzahlWein <= 12) {
            this.versandTotalSource.next(7.5);
            console.log("versand 1 -12");
            return; 
        } 
        if (anzahlWein >= 13 && anzahlWein <= 24) {
            this.versandTotalSource.next(15.0);
            console.log("versand 24");
            return; 
        } 
        if (anzahlWein >= 25) {
            this.versandTotalSource.next(preisProFlasche * anzahlWein);
            console.log("versand > 25");
            return; 
        }
        this.versandTotalSource.next(0);
    }

    getDeliveryDate(): string {
        const startDate = new Date();
        const endDate = addDays(startDate, 5);
    
        const formattedStartDate = format(startDate, 'dd.MMM');
        const formattedEndDate = format(endDate, 'dd.MMM');
    
        return `${formattedStartDate} - ${formattedEndDate}`;
    }
}