import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rebsorte } from '../models/Rebsorten';

//Konstanten 
const REBSORTE_URL = 'http://localhost/api/rebsorte/';

@Injectable({providedIn: "root"})
export class rebsortenService{
    constructor(private http: HttpClient){
        
    }


    fetchRebsorten(): Observable<any> {
       return this.http.get(REBSORTE_URL);
    }
}