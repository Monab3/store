import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { BehaviorSubject } from 'rxjs';
import { format, addDays } from 'date-fns';



@Injectable({ providedIn: "root" })
export class cartService {
    private cartVisibilityVariable = false;

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

    /**
    * Berechnet den Gesamtpreis und die Gesamtanzahl der Produkte im Warenkorb.
    * Aktualisiert die entsprechenden Observables für den Gesamtpreis und die Gesamtanzahl.
     */
    private calculateTotal() {
        const currentCart = this.cartInhaltSource.getValue();
        const total = currentCart.reduce((sum, item) => sum + (item.wein.preis * item.produktAnzahl), 0);
        this.cartTotalSource.next(total);
        let totalProduktAnzahl: number = currentCart.reduce((total, cartItem) => total + cartItem.produktAnzahl, 0);
        this.cartTotalProduktAnzahlSource.next(totalProduktAnzahl);
        this.calculateVersand(totalProduktAnzahl, total);
    }

    /**
     * Berechnet die Versandkosten abhängig von der Anzahl der Produkte und dem Warenwert.
     * Aktualisiert das entsprechende Observable für die Versandkosten.
     * 
     * @param anzahlWein - Anzahl der Produkte im Warenkorb
     * @param warenwert - Gesamtwert der Produkte im Warenkorb
     */
    private calculateVersand(anzahlWein: number, warenwert: number): void {
        const preisProFlasche = 0.5;
        if (warenwert >= 350) {
            this.versandTotalSource.next(0);
            return;
        }
        if (anzahlWein >= 1 && anzahlWein <= 12) {
            this.versandTotalSource.next(7.5);
            return;
        }
        if (anzahlWein >= 13 && anzahlWein <= 24) {
            this.versandTotalSource.next(15.0);
            return;
        }
        if (anzahlWein >= 25) {
            this.versandTotalSource.next(preisProFlasche * anzahlWein);
            return;
        }
        this.versandTotalSource.next(0);
    }

    /**
    * Fügt ein neues Element zum Warenkorb hinzu oder aktualisiert die Menge, wenn das Produkt bereits vorhanden ist.
    * Aktualisiert das Observable für den Warenkorbinhalt und berechnet anschließend den Gesamtpreis und die Gesamtanzahl neu.
    * Das neue Element wird an Index 0 hinzugefügt, damit es im Warenkorb-PopUp oben angezeigt wird.
    *
    * @param newItem - Das neue Element, das dem Warenkorb hinzugefügt wird.
    */
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
        } else {
            const updatedcart = [...currentcart, newItem];
            this.cartInhaltSource.next(updatedcart);
        }
        this.calculateTotal();
    }

    /**
    * Entfernt ein Element aus dem Warenkorb.
    *
    * @param item - Das zu entfernende Element aus dem Warenkorb.
    */
    deleteFromCart(item: CartItem) {
        const currentCart = this.cartInhaltSource.getValue();
        const updatedcart = currentCart.filter(cartItem => cartItem.wein._id !== item.wein._id);
        this.cartInhaltSource.next(updatedcart);
        this.calculateTotal();
    }

    /**
    * Leert den Warenkorb, entfernt alle Elemente.
    */
    clearCart() {
        const currentCart = this.cartInhaltSource.getValue();
        const updatedcart: CartItem[] = [];
        this.cartInhaltSource.next(updatedcart);
        this.calculateTotal();
    }

    /**
    * Setzt die Sichtbarkeit des Warenkorbs auf 'true'.
    */
    setcartVisibilityTrue(): void {
        this.cartVisibilityVariable = true;
        this.cartVisibilitySource.next(this.cartVisibilityVariable);
    }

    /**
    * Gibt ein voraussichtliches Lieferdatum basierend auf dem aktuellen Datum und einem festen Zeitraum zurück.
    *
    * @returns Die voraussichtlichen Lieferdaten im Format "StartTag.StartMonat - EndTag.EndMonat".
    */
    getDeliveryDate(): string {
        const startDate = new Date();
        const endDate = addDays(startDate, 5);

        const formattedStartDate = format(startDate, 'dd.MMM');
        const formattedEndDate = format(endDate, 'dd.MMM');
        return `${formattedStartDate} - ${formattedEndDate}`;
    }
}