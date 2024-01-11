import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rebsorte } from '../models/Rebsorten';
import { User } from '../models/User';

@Injectable({ providedIn: "root" })
export class userService {


    private adresseSource =new BehaviorSubject<User>({});
    private rechnungsAdresseSource = new BehaviorSubject<User>({});
    adresse = this.adresseSource.asObservable();
    rechnungsAdresse= this.rechnungsAdresseSource.asObservable();
    constructor(private http: HttpClient) {

    }

    setAdresse(adresse: User){
        this.adresseSource.next(adresse);
    }

    setRechnungsAdresse(rechnungsAdresse: User){
        this.rechnungsAdresseSource.next(rechnungsAdresse);
    }
}