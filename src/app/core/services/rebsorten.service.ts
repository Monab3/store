import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rebsorte } from '../models/Rebsorten';

//Konstanten 
const REBSORTE_URL = 'http://localhost/api/rebsorte/';

@Injectable({ providedIn: "root" })
export class rebsortenService {
    rebsorten: Rebsorte[] = [{
        _id: "1",
        rebsorte: "Merlot",
        rebsorteBeschreibung: "Merlot ist eine angesehene Rotweinsorte mit Ursprung im Bordeaux, Frankreich. Die Trauben zeichnen sich durch ihre dickere Schale aus, was zu einem vollmundigen und geschmeidigen Wein führt. Der Merlot besticht durch seine fruchtigen Aromen von dunklen Beeren wie Kirschen und Pflaumen, kombiniert mit einer angenehmen Weichheit.",
        rebsorteBild: "../../assets/rebsorte.png", 
        bildBeschreibung: "Merlot Rebsorte"
    }
    ];
    constructor(private http: HttpClient) {

    }

    getRebsorte(rebsorte: string): Rebsorte | undefined {
        return this.rebsorten.find(item => item.rebsorte === rebsorte);
    }


    fetchRebsorten(): Observable<any> {
        return this.http.get(REBSORTE_URL);
    }
}