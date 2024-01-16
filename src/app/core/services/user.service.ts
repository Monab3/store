import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({ providedIn: "root" })
export class userService {

    private adresseSource =new BehaviorSubject<User>({});
    private rechnungsAdresseSource = new BehaviorSubject<User>({});
    adresse = this.adresseSource.asObservable();
    rechnungsAdresse= this.rechnungsAdresseSource.asObservable();

    setAdresse(adresse: User){
        this.adresseSource.next(adresse);
    }

    setRechnungsAdresse(rechnungsAdresse: User){
        this.rechnungsAdresseSource.next(rechnungsAdresse);
    }
}