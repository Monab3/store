import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wein } from '../models/Wein';
import { WarenkorbItem } from '../models/WarenkorbItem';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: "root" })
export class warenkorbService {
    private warenkorbInhaltSource = new BehaviorSubject<WarenkorbItem[]>([]);
    private anzahlWarenkorb = new BehaviorSubject<Number>(0);
    warenkorbInhalt = this.warenkorbInhaltSource.asObservable();
    anzahlWarenkorbItems = this.anzahlWarenkorb.asObservable();

    constructor(private http: HttpClient) {
    }

    // Function to add a new item to the warenkorb
    addToWarenkorb(newItem: WarenkorbItem) {
        const currentWarenkorb = this.warenkorbInhaltSource.getValue();
        const updatedWarenkorb = [...currentWarenkorb, newItem];
        this.warenkorbInhaltSource.next(updatedWarenkorb);
        this.anzahlWarenkorb.next(updatedWarenkorb.length);
    }
}